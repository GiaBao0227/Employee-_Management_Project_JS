import { getEleId } from "./../controllers/main.js";

/**
 * 
 * 1. Khối nhập liệu (Input)
    Mục tiêu:
      Thu thập thông tin người dùng nhập vào qua form và kiểm tra tính hợp lệ của các trường dữ liệu. Người dùng sẽ nhập vào thông tin để tạo đối tượng nhân viên, và hệ thống sẽ thực hiện các kiểm tra đầu vào (validation) để đảm bảo dữ liệu hợp lệ.
    Dữ liệu đầu vào:
      Các trường dữ liệu mà người dùng cần nhập, bao gồm:
        Tài khoản: Tối đa 4-6 ký tự số, không để trống.
        Họ tên: Phải là chữ, không để trống.
        Email: Phải có định dạng hợp lệ (ví dụ: example@domain.com), không để trống.
        Mật khẩu: Phải có từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, và 1 ký tự đặc biệt, không để trống.
        Ngày làm: Không để trống, phải ở định dạng mm/dd/yyyy.
        Lương cơ bản: Phải trong khoảng 1,000,000 - 20,000,000 VND, không để trống.
        Chức vụ: Phải chọn 1 trong các chức vụ hợp lệ: Giám đốc, Trưởng Phòng, Nhân Viên.
        Giờ làm trong tháng: Phải trong khoảng 80 - 200 giờ, không để trống.
  2. Khối xử lý (Process)
    Mục tiêu:
      Tiến hành kiểm tra tính hợp lệ của các dữ liệu đã nhập vào từ form người dùng (validation) và tạo đối tượng nhân viên nếu tất cả các điều kiện hợp lệ.
    Các bước xử lý chính:
      1.Lấy dữ liệu từ form:
        Sau khi người dùng gửi form, lấy dữ liệu từ các trường nhập liệu.
      2.Kiểm tra tính hợp lệ (Validation):
        Tài khoản: Kiểm tra xem tài khoản có từ 4-6 ký tự số và không trống.
        Họ tên: Kiểm tra xem họ tên chỉ chứa chữ và không trống.
        Email: Kiểm tra xem email có đúng định dạng không (ví dụ: sử dụng Regex để kiểm tra định dạng email).
        Mật khẩu: Kiểm tra mật khẩu có từ 6-10 ký tự, ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt.
        Ngày làm: Kiểm tra ngày làm có đúng định dạng mm/dd/yyyy và không trống.
        Lương cơ bản: Kiểm tra xem lương cơ bản có trong khoảng 1,000,000 - 20,000,000 và không trống.
        Chức vụ: Kiểm tra xem chức vụ có hợp lệ không (Giám đốc, Trưởng Phòng, Nhân Viên).
        Giờ làm trong tháng: Kiểm tra số giờ làm có trong khoảng 80-200 và không trống.
      3.Tạo đối tượng nhân viên:
        Nếu tất cả các dữ liệu hợp lệ, tạo đối tượng nhân viên mới với các thuộc tính đã nhập vào.
        Tính toán các thuộc tính cần thiết như tổng lương (nếu có).
      4.Mã hóa mật khẩu:
        Mật khẩu cần được mã hóa (bằng cách sử dụng thuật toán hash) trước khi lưu trữ trong cơ sở dữ liệu (nếu cần).
  3. Khối xuất kết quả (Output)
    Mục tiêu:
      Hiển thị kết quả tạo nhân viên mới và cung cấp thông tin cho người dùng sau khi thực hiện các bước kiểm tra và tạo đối tượng nhân viên.
    Kết quả đầu ra:
      1.Thông báo kết quả:
        Nếu tất cả các dữ liệu hợp lệ và đối tượng nhân viên được tạo thành công, hệ thống sẽ hiển thị thông báo "Tạo nhân viên thành công!".
        Nếu có lỗi trong validation, hệ thống sẽ thông báo lỗi và yêu cầu người dùng sửa lại các trường thông tin chưa hợp lệ.
      2.Hiển thị thông tin nhân viên:
        Thông tin về nhân viên mới có thể được hiển thị trong bảng danh sách nhân viên hoặc chi tiết nhân viên sau khi tạo thành công.
      3.Cập nhật giao diện người dùng:
        Hiển thị danh sách nhân viên đã được cập nhật với nhân viên mới.
 */
class Validation {
  checkEmpty(value, divId, mess) {
    if (value === "") {
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }

    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }
  checkLength(value, divId, mess, min = 4, max = 6) {
    // Cập nhật biểu thức chính quy để kiểm tra độ dài hợp lệ
    const regex = new RegExp(`^\\w{${min},${max}}$`); // Chỉ cho phép chữ cái và số
    if (regex.test(value)) {
      // Nếu đúng định dạng, ẩn thông báo lỗi
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    } else {
      // Nếu sai định dạng, hiển thị thông báo lỗi
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }
  }

  checkSelect(idSelect, divId, mess) {
    if (getEleId(idSelect).selectedIndex === 0) {
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }

    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }

  checkCharacterString(value, divId, mess) {
    const regex = /^[a-zA-ZÀ-Ỹà-ỹ\s]+$/;
    if (value.match(regex)) {
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    }

    getEleId(divId).innerHTML = mess;
    getEleId(divId).style.display = "block";
    return false;
  }

  checkAccountExist(value, divId, mess, listEmployee) {
    let isExist = false;

    for (let i = 0; i < listEmployee.length; i++) {
      const employee = listEmployee[i];
      if (employee.account === value) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      // id ton tai => khong hop le
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }

    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }

  checkEmail(value, divId, mess) {
    // Biểu thức chính quy kiểm tra định dạng email hợp lệ
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Kiểm tra nếu email không đúng định dạng
    if (!emailRegex.test(value)) {
      getEleId(divId).innerHTML = mess; // Hiển thị thông báo lỗi
      getEleId(divId).style.display = "block";
      return false;
    }

    // Nếu email hợp lệ, ẩn thông báo lỗi
    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }

  checkPassword(value, divId, mess) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
    if (passwordRegex.test(value)) {
      // Nếu mật khẩu hợp lệ, ẩn thông báo lỗi
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    } else {
      // Nếu mật khẩu không hợp lệ, hiển thị thông báo lỗi
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }
  }

  checkDate(value, divId, mess) {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (dateRegex.test(value)) {
      // Nếu ngày hợp lệ, ẩn thông báo lỗi
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    } else {
      // Nếu ngày không hợp lệ, hiển thị thông báo lỗi
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }
  }

  checkSalary(value, divId, mess) {
    // Chuyển giá trị thành số và kiểm tra xem có phải là số nguyên không
    const salary = parseInt(value, 10);

    // Kiểm tra nếu lương hợp lệ trong khoảng 1.000.000 đến 20.000.000
    if (isNaN(salary) || salary < 1000000 || salary > 20000000) {
      // Nếu không hợp lệ, hiển thị thông báo lỗi
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }

    // Nếu lương hợp lệ, ẩn thông báo lỗi
    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }

  checkSalary(value, divId, mess) {
    // Chuyển giá trị thành số và kiểm tra xem có phải là số nguyên không
    const salary = parseInt(value, 10);

    // Kiểm tra nếu lương hợp lệ trong khoảng 1.000.000 đến 20.000.000
    if (isNaN(salary) || salary < 1000000 || salary > 20000000) {
      // Nếu không hợp lệ, hiển thị thông báo lỗi
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }

    // Nếu lương hợp lệ, ẩn thông báo lỗi
    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }

  checkTime(value, divId, mess) {
    // Chuyển giá trị thành số nguyên
    const time = parseInt(value, 10);
  
    // Kiểm tra nếu giá trị là một số hợp lệ và nằm trong khoảng từ 80 đến 200
    if (isNaN(time) || time < 80 || time > 200) {
      // Nếu không hợp lệ, hiển thị thông báo lỗi
      getEleId(divId).innerHTML = mess;
      getEleId(divId).style.display = "block";
      return false;
    }
  
    // Nếu hợp lệ, ẩn thông báo lỗi
    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }
  
}

export default Validation;
