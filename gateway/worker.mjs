// V6.1.2 demo gateway. Deploy separately; secrets are environment bindings, not source.
const ORIGIN='https://mattransoag.github.io';
const b64=s=>Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/').padEnd(Math.ceil(s.length/4)*4,'=')),c=>c.charCodeAt(0));
const enc=new TextEncoder();
const encode=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
async function identity(token,env){
 if(typeof token!=='string'||token.length>10000)throw Error('UNAUTHENTICATED');
 const a=token.split('.');if(a.length!==3)throw Error('UNAUTHENTICATED');
 const h=JSON.parse(new TextDecoder().decode(b64(a[0]))),p=JSON.parse(new TextDecoder().decode(b64(a[1])));
 if(h.alg!=='RS256'||typeof h.kid!=='string')throw Error('UNAUTHENTICATED');
 const now=Math.floor(Date.now()/1000);
 if(!['https://accounts.google.com','accounts.google.com'].includes(p.iss)||p.aud!==env.GOOGLE_CLIENT_ID||p.email_verified!==true||typeof p.email!=='string'||typeof p.sub!=='string'||!Number.isFinite(p.exp)||p.exp<=now||!Number.isFinite(p.iat)||p.iat>now+30)throw Error('UNAUTHENTICATED');
 if(env.GOOGLE_HOSTED_DOMAIN&&p.hd!==env.GOOGLE_HOSTED_DOMAIN)throw Error('FORBIDDEN');
 const res=await fetch('https://www.googleapis.com/oauth2/v3/certs');if(!res.ok)throw Error('AUTH_UNAVAILABLE');
 const keys=(await res.json()).keys,key=keys.find(k=>k.kid===h.kid&&k.kty==='RSA');if(!key)throw Error('UNAUTHENTICATED');
 const cryptoKey=await crypto.subtle.importKey('jwk',key,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
 if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',cryptoKey,b64(a[2]),enc.encode(a[0]+'.'+a[1])))throw Error('UNAUTHENTICATED');
 return p.email.trim().toLowerCase();
}
export default {async fetch(request,env){
 const headers={'Access-Control-Allow-Origin':ORIGIN,'Vary':'Origin','Cache-Control':'no-store','Content-Type':'application/json','X-Content-Type-Options':'nosniff'};
 const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
 if(request.headers.get('Origin')!==ORIGIN)return json({ok:false,error:'FORBIDDEN'},403);
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Max-Age':'600'}});
 if(request.method!=='POST'||new URL(request.url).pathname!=='/api')return json({ok:false,error:'INVALID_REQUEST'},405);
 if(env.DEMO_ENABLED!=='TRUE'||!env.GOOGLE_CLIENT_ID||!env.GATEWAY_SECRET||env.GATEWAY_SECRET.length<43||!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(env.GAS_URL||''))return json({ok:false,error:'GATEWAY_DISABLED'},503);
 try{
 const auth=request.headers.get('Authorization')||'',email=await identity(auth.startsWith('Bearer ')?auth.slice(7):'',env);
 const size=Number(request.headers.get('Content-Length')||0);if(size>16000000)return json({ok:false,error:'INVALID_REQUEST'},413);
 const raw=await request.text();if(raw.length>16000000)return json({ok:false,error:'INVALID_REQUEST'},413);
 const req=JSON.parse(raw);if(!req||typeof req.action!=='string')throw Error('INVALID_REQUEST');
 const payload=JSON.stringify({email,ts:Date.now(),nonce:crypto.randomUUID(),req});
 const key=await crypto.subtle.importKey('raw',enc.encode(env.GATEWAY_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const sig=encode(await crypto.subtle.sign('HMAC',key,enc.encode(payload)));
 let r=await fetch(env.GAS_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({payload,sig}),redirect:'manual'});
 if([301,302,303].includes(r.status)){let u=new URL(r.headers.get('Location'));if(u.protocol!=='https:'||u.hostname!=='script.googleusercontent.com')throw Error('CONNECTION_ERROR');r=await fetch(u,{redirect:'error'})}
 if(!r.ok)throw Error('CONNECTION_ERROR');let result=await r.json();return json(result);
 }catch(e){return json({ok:false,error:['UNAUTHENTICATED','FORBIDDEN','AUTH_UNAVAILABLE','INVALID_REQUEST'].includes(e.message)?e.message:'CONNECTION_ERROR'},400)}
}};
