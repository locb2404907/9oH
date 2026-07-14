// Hàm hiển thị trạng thái lên giao diện thay thế cho alert()
function showStatus(message, type) {
    const errorBox = document.getElementById('error-message');
    errorBox.innerText = message;
    errorBox.style.display = 'block'; // Hiển thị thẻ thông báo

    // Xóa class cũ nếu có
    errorBox.classList.remove('msg-error', 'msg-success');

    // Cập nhật màu sắc theo trạng thái kết quả
    if (type === 'error') {
        errorBox.classList.add('msg-error');
    } else if (type === 'success') {
        errorBox.classList.add('msg-success');
    }
}

function handleLogin(event) {
    // Ngăn form tự tải lại trang
    event.preventDefault();

    const inputUsername = document.getElementById('login-username').value.trim();
    const inputPassword = document.getElementById('login-password').value.trim();

    // 1. Ràng buộc kiểm tra bỏ trống dữ liệu đầu vào
    if (inputUsername === "" || inputPassword === "") {
        showStatus("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!", "error");
        return;
    }

    // 2. Lấy danh sách tài khoản từ Local Storage
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // 3. Kiểm tra xem hệ thống đã có tài khoản nào đăng ký chưa
    if (accounts.length === 0) {
        showStatus("Nhập sai! Hệ thống chưa có tài khoản nào được đăng ký.", "error");
        return;
    }

    // 4. Tìm kiếm tài khoản trùng khớp trong Mảng
    const validAccount = accounts.find(acc => acc.username === inputUsername && acc.password === inputPassword);

    // 5. Xử lý hiển thị kết quả xác thực ra màn hình
    if (validAccount) {
        // Đúng thông tin -> Lưu trạng thái vào Session Storage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', validAccount.username);
        
        // Hiển thị chữ màu xanh lá báo thành công
        showStatus("Nhập đúng! Đăng nhập thành công. Đang chuyển hướng...", "success");

        // Giữ hiệu ứng 1.5 giây để nhìn thấy chữ xanh trước khi đổi trang
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1500);
        
    } else {
        // Sai tài khoản hoặc mật khẩu -> Hiển thị chữ màu đỏ
        showStatus("Nhập sai! Tên đăng nhập hoặc mật khẩu không chính xác.", "error");
    }
}