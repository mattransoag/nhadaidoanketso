# V6 — kiến trúc dự kiến (chưa kết nối)

GitHub Pages chỉ trình bày giao diện, không chứa bí mật hay dữ liệu thật. GAS là lớp nghiệp vụ và kiểm tra quyền; Google Sheets lưu hồ sơ, đơn vị, tài khoản, giao dịch, chỉ tiêu, nhiệm vụ, báo cáo, nhật ký; Drive riêng tư lưu minh chứng.

## Hợp đồng API dự kiến

- session: xác thực danh tính, trả vai trò và mã đơn vị do máy chủ xác định.
- records.list/get/create/update/submit: kiểm tra phạm vi từng yêu cầu; đơn vị không được tự đổi mã đơn vị, phê duyệt hoặc cập nhật kinh phí giải ngân.
- workflow.transition: kiểm tra trạng thái, điều kiện, phiên bản hồ sơ và quyền.
- finance.post: kiểm tra hạn mức, chứng từ, chống trùng yêu cầu; giao dịch và tổng hợp nhất quán.
- evidence.list/upload/download: kiểm tra quyền hồ sơ, loại tệp, dung lượng; không chia sẻ Drive công khai.
- reports.export/submit/review: lọc theo quyền tại máy chủ, lưu bản chụp và phiên bản.
- tasks.list/update: phạm vi đơn vị và quyền cập nhật.
- admin.catalog/accounts/config/backup: chỉ quản trị.

Mỗi yêu cầu thay đổi cần mã yêu cầu chống lặp, phiên bản dữ liệu, thời gian máy chủ và nhật ký. Không tin vai trò hoặc mã đơn vị do trình duyệt gửi. Dùng LockService cho các thao tác ghi đồng thời, kiểm tra giới hạn Apps Script; không nhúng khóa hoặc mật khẩu trong frontend. Chọn phương án xác thực Google phù hợp chính sách cơ quan, xác minh khả năng triển khai trước khi dùng dữ liệu thật.

## Điều kiện nghiệm thu trước vận hành

Kiểm thử truy cập chéo đơn vị, quyền xem/ghi/xuất, phiên hết hạn, thao tác đồng thời, sao lưu phục hồi cả tệp, số liệu báo cáo đối chiếu, kiểm tra trình duyệt máy tính và điện thoại. Bản V5.8.2 chỉ dùng dữ liệu giả lập, chưa đáp ứng các điều kiện bảo mật máy chủ.
