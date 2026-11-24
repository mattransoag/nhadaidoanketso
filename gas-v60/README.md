# V6.0.1 PRO — thử nghiệm riêng tư

## Nâng cấp từ V6.0

Không chạy lại setup, không xóa dữ liệu. Sao lưu bảng tính mẫu trước khi nâng cấp. Thay toàn bộ Code.gs và Portal.html bằng hai tệp cùng tên trong thư mục này. Không cần PortalPro.html; doGet luôn dùng Portal. Giữ SPREADSHEET_ID và PILOT_ENABLED = TRUE hiện có. Tạo thư mục Drive riêng tư dành riêng cho minh chứng mẫu, không chia sẻ với bất cứ người dùng nào khác, thêm EVIDENCE_FOLDER_ID vào Script Properties. Triển khai phiên bản mới của Web App hiện có, Execute as Me, Only myself. Có thể cần cấp thêm quyền Drive. Không dùng dữ liệu thật.

## Phạm vi

Có API và màn hình thử nghiệm cho hồ sơ, phê duyệt, tiến độ, hạn mức và giao dịch, minh chứng JPG/PNG/PDF tối đa 5 MB, nghiệm thu/bàn giao/quyết toán/lưu trữ, chỉ tiêu, nhiệm vụ, báo cáo, danh mục, xem tài khoản, nhật ký và xuất JSON. Báo cáo CSV mở Excel, in PDF; chưa có DOCX/XLSX native. Chưa có phục hồi tự động, sao lưu nội dung tệp, phân quyền nhiều tài khoản thật, kiểm thử giao dịch mất kết nối, hay đủ chi tiết quy trình V5.8.2. Bản demo GitHub không thay đổi. Khóa owner-only không được gỡ. Không chia sẻ trực tiếp Sheets/Drive.

## Kiểm thử bắt buộc

1. Hồ sơ đã có vẫn hiện sau cập nhật. Tạo hồ sơ giả lập, sửa, gửi thẩm định, duyệt. 2. Giao hạn mức mẫu, cấp và giải ngân, từ chối vượt hạn mức/trùng chứng từ. Kiểm tra sổ giao dịch và hồ sơ khớp nhau. Ghi nhiều sheet không có giao dịch nguyên tử; nếu LEDGER_MISMATCH thì dừng ghi và đối chiếu thủ công. 3. Tải minh chứng giả lập, kiểm tra Drive riêng tư, tải lại. 4. Tiến độ 100%, nghiệm thu, bàn giao, quyết toán chỉ khi số liệu khớp, lưu trữ. 5. Lọc báo cáo, xuất CSV/PDF, giao nhiệm vụ, gửi/duyệt báo cáo, xuất JSON. 6. Kiểm tra tài khoản khác bị từ chối; chỉ mở rộng sau thiết kế xác thực máy chủ và thử quyền chéo đơn vị. Không đưa dữ liệu thật trước nghiệm thu.

## V6.0.2
Thay Code.gs và Portal.html, giữ nguyên Script Properties, không chạy setup lại. Triển khai phiên bản mới trên cùng deployment, Execute as Me / Only myself. Có thêm nhóm menu, biểu mẫu tiền tệ, cảnh báo, xuất DOCX/XLSX phía GAS, in A4 và JSON kèm minh chứng (tổng tệp tối đa 10 MB). Chưa kiểm thử Office thực tế, phục hồi tự động hoặc nhiều tài khoản; vẫn chỉ dùng dữ liệu mẫu. Tệp sao lưu có dữ liệu và nội dung minh chứng: giữ riêng tư. Không mở quyền công khai.

## V6.0.3
Sao lưu dữ liệu mẫu trước khi nâng cấp. Thay Code.gs và Portal.html, giữ nguyên Script Properties và deployment Only myself. Vào Kiểm tra hệ thống > Cấp mã nghiệp vụ cho hồ sơ cũ; thao tác giữ UUID, cập nhật JSON và version hồ sơ, dùng năm tiếp nhận hoặc năm cập nhật nếu thiếu ngày tiếp nhận. Không sửa ID bằng tay. Bộ đếm nằm trong Script Properties; không xóa hoặc đặt lại. Mã nghiệp vụ khác cấp cho thao tác mới; không thay thế số chứng từ chính thức. Kiểm tra lại hồ sơ, báo cáo, giao dịch. Phân trang máy chủ vẫn đọc toàn bảng Sheets rồi lọc; chưa phải tối ưu cơ sở dữ liệu lớn. Chưa có nhập XLSX hàng loạt, QR, xem trước PDF, phục hồi tự động, kiểm thử Office và nhiều tài khoản thực tế. Chỉ dữ liệu giả lập.
