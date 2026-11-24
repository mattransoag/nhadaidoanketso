# V6.1.2 — GitHub workspace / isolated demo gateway

Current private GAS deployment remains unchanged. Never enable public access on the existing project containing operational data.

- workspace.html: GitHub management screens; config612.js intentionally empty, no live API yet.
- gateway/worker.mjs: example Cloudflare Worker API. Verifies Google ID token signature, issuer, audience, expiry and verified email; optional Workspace hosted domain. Signs requests to GAS with HMAC. CORS restricted to GitHub origin.
- gas-v60/Code.gs: optional doPost gateway, disabled by default. Existing apiV60 owner-only identity still enforced for private GAS portal. Every gateway business call rechecks active user, role, unit and session.
- Not production certified. Replay cache best effort; needs rate limits, independent replay protection, subject-bound identity enrollment (email alone insufficient for some external Google identities), recovery, browser tests and security review.

## Deployment checklist (demo only)
1. Create separate GAS project, separate synthetic Sheets and private Drive folder. Do not reuse live storage or existing owner-only deployment. Copy Code.gs and Portal.html, configure SPREADSHEET_ID, EVIDENCE_FOLDER_ID, PILOT_ENABLED=TRUE. Run setup manually. Populate only demo accounts.
2. Create Google OAuth web client with authorized JavaScript origin https://mattransoag.github.io. For organization accounts, restrict to the approved Workspace domain where possible.
3. Generate a random 32-byte or stronger gateway secret locally; set it as a private secret in Worker and GAS Script Properties (GATEWAY_SECRET). Never put it in GitHub, browser config or logs.
4. Set GATEWAY_DEMO_ENABLED=TRUE only in isolated GAS. Deploy separate GAS Web App executing as owner with HTTP access needed by gateway; unsigned requests rejected. Review anonymous transport exposure and quota risks before enabling.
5. Deploy gateway/worker.mjs with environment GOOGLE_CLIENT_ID, optional GOOGLE_HOSTED_DOMAIN, GAS_URL (isolated deployment), GATEWAY_SECRET, DEMO_ENABLED=TRUE. Add rate limits and monitoring. Do not expose secrets.
6. After verification, set public gateway URL ending /api and public OAuth client ID in config612.js. Test all five roles, cross-unit reads and writes, exports, evidence, expired and revoked sessions, invalid signatures, disabled users and replay. Keep real data out until security acceptance.
7. Existing GAS portal remains fallback; no change to its deployment, data or URL. Rollback by blanking config612.js and disabling gateway flags.
