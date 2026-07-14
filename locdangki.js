// Hàm phụ trợ dùng để hiển thị thông báo lên giao diện thay cho alert
function showStatus(message, type) {
    const errorBox = document.getElementById('error-message');
    errorBox.innerText = message;
    errorBox.style.display = 'block'; // Hiện thẻ thông báo lên

    // Xóa bỏ các class trạng thái cũ nếu có
    errorBox.classList.remove('msg-error', 'msg-success');

    // Thêm class tương ứng với trạng thái để đổi màu CSS
    if (type === 'error') {
        errorBox.classList.add('msg-error');
    } else if (type === 'success') {
        errorBox.classList.add('msg-success');
    }
}

function handleRegister(event) {
    // Ngăn chặn form tự tải lại trang
    event.preventDefault();

    // Lấy dữ liệu từ các ô input và loại bỏ khoảng trắng
    const usernameInput = document.getElementById('reg-username').value.trim();
    const phoneInput = document.getElementById('reg-phone').value.trim(); 
    const passwordInput = document.getElementById('reg-password').value.trim();

    // ==========================================================================
    // PHẦN RÀNG BUỘC DỮ LIỆU (VALIDATION VIA INTERFACE)
    // ==========================================================================
    
    // 1. Ràng buộc bỏ trống
    if (usernameInput === "" || phoneInput === "" || passwordInput === "") {
        showStatus("Vui lòng điền đầy đủ tất cả các thông tin!", "error");
        return;
    }

    // 2. Ràng buộc độ dài Tên đăng nhập
    if (usernameInput.length < 5) {
        showStatus("Nhập sai! Tên đăng nhập phải chứa ít nhất 5 ký tự.", "error");
        return;
    }

    // 3. Ràng buộc định dạng Số điện thoại Việt Nam
    const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phoneInput)) {
        showStatus("Nhập sai! Số điện thoại không hợp lệ (Phải đủ 10 số và bắt đầu bằng 03,05,07,08,09).", "error");
        return;
    }

    // 4. Ràng buộc độ dài Mật khẩu
    if (passwordInput.length < 6) {
        showStatus("Nhập sai! Mật khẩu phải chứa ít nhất 6 ký tự.", "error");
        return;
    }

    // ==========================================================================
    // LOGIC XỬ LÝ LƯU TRỮ & THÀNH CÔNG
    // ==========================================================================

    // Lấy danh sách tài khoản hiện có từ Local Storage
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Kiểm tra xem tên đăng nhập đã tồn tại trong mảng chưa
    const isExist = accounts.some(acc => acc.username === usernameInput);
    
    if (isExist) {
        showStatus("Nhập sai! Tên đăng nhập này đã có người sử dụng.", "error");
        return; 
    }

    // Nếu vượt qua tất cả các bước kiểm tra -> Tạo đối tượng mới
    const newAccount = {
        username: usernameInput,
        password: passwordInput,
        phone: phoneInput
    };

    // Thêm vào danh sách và lưu lại Local Storage
    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Hiển thị trạng thái màu xanh lá báo thành công
    showStatus("Nhập đúng! Đăng ký thành công. Đang chuyển hướng...", "success");

    // Trì hoãn 1.5 giây để người dùng kịp nhìn thấy chữ màu xanh lá rồi mới chuyển trang
    setTimeout(function() {
        window.location.href = 'locdangnhap.html';
    }, 1500);
}