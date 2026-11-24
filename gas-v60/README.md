# V6.0 pilot — chỉ dữ liệu giả lập

Không thay thế bản demo GitHub Pages. Chưa tích hợp toàn bộ nghiệp vụ và chưa triển khai GAS.

1. Tạo Google Sheets mới, riêng tư, chỉ chứa dữ liệu giả lập. Không chia sẻ cho cán bộ cơ sở.
2. Mở Extensions > Apps Script. Dán Code.gs, tạo tệp HTML tên Portal và dán Portal.html.
3. Project Settings > Script Properties: thêm SPREADSHEET_ID (ID bảng tính mới) và PILOT_ENABLED = TRUE. Không đưa ID hoặc bí mật lên GitHub.
4. Chạy setupV60_ trong trình soạn thảo, cấp quyền, kiểm tra 11 sheet. Không sửa tiêu đề cột. Thêm một đơn vị mẫu vào Units: DV-M001 | Đơn vị mẫu A | TRUE. Thêm email Google của người triển khai vào Users: email | SUPER_ADMIN | (trống) | TRUE.
5. Deploy > New deployment > Web app. Execute as: Me; Who has access: Only myself. Không chọn Anyone. Mở URL /exec để thử đọc/ghi hồ sơ nháp. Nếu danh tính không xác định, API từ chối.
6. Không đưa dữ liệu thật, không cấp quyền cơ sở, không dùng bảng tính chung. Bản này cố ý giới hạn người thực thi là chủ sở hữu. Cấu trúc quyền 5 vai trò mới là bước chuẩn bị. Cần xác minh phương án xác thực Workspace hoặc nhà cung cấp danh tính phù hợp, kiểm thử chéo đơn vị với tài khoản thật và bảo đảm người dùng không truy cập trực tiếp Sheets/Drive trước khi mở rộng.

Các API hiện có: session, units.list, records.list, records.create, records.update. Chưa có API phê duyệt, tài chính, minh chứng, báo cáo, nhiệm vụ hoặc sao lưu thực tế. Giao diện Portal chỉ là trang kiểm thử riêng. Không gọi là đã tích hợp V6 toàn diện.

Tài liệu Google: https://developers.google.com/apps-script/reference/base/session ; https://developers.google.com/apps-script/guides/web .
