// models/employee.js
export default class Employee {
  constructor(account, name, email, password, date, salary, position, time) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.salary = Number(salary); // Ensure salary is numeric
    this.position = position;
    this.time = Number(time); // Ensure time is numeric
  }

  /**
   * 
   * 1. Khối nhập liệu (Input)
      Mục tiêu:
        Thu thập thông tin từ người dùng nhập vào qua form, bao gồm các thông tin cần thiết để tạo đối tượng nhân viên và tính toán tổng lương.
      Dữ liệu đầu vào:
        Người dùng cần nhập các thông tin sau vào form:
          Tài khoản: Tối đa 4-6 ký tự số, không để trống.
          Họ tên: Phải là chữ, không để trống.
          Email: Phải có định dạng hợp lệ, không để trống.
          Mật khẩu: Phải có từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, và 1 ký tự đặc biệt, không để trống.
          Ngày làm: Không để trống, phải ở định dạng mm/dd/yyyy.
          Lương cơ bản: Phải trong khoảng từ 1,000,000 đến 20,000,000 VND, không để trống.
          Chức vụ: Chọn từ các giá trị hợp lệ: Giám đốc, Trưởng Phòng, Nhân Viên.
          Giờ làm trong tháng: Phải trong khoảng từ 80 - 200 giờ, không để trống.
    2. Khối xử lý (Process)
      Mục tiêu:
        Xử lý dữ liệu người dùng nhập vào, kiểm tra tính hợp lệ của dữ liệu, tạo đối tượng nhân viên và tính tổng lương dựa trên chức vụ của nhân viên.
      Các bước xử lý:
        1.Lấy dữ liệu từ form:
          Khi người dùng gửi form, các dữ liệu sẽ được lấy từ các trường đầu vào.
        2.Kiểm tra tính hợp lệ của dữ liệu (Validation):
          Các trường như tài khoản, email, mật khẩu, chức vụ, giờ làm, v.v... cần được kiểm tra để đảm bảo rằng dữ liệu hợp lệ. Các thông báo lỗi sẽ được hiển thị nếu có trường dữ liệu sai.
        3.Tạo đối tượng nhân viên:
          Nếu tất cả các dữ liệu hợp lệ, tạo đối tượng nhân viên mới với các thuộc tính đã nhập vào.
        4.Tính toán tổng lương:
          Dựa vào chức vụ, tổng lương sẽ được tính toán theo công thức:
            Giám đốc: Tổng lương = Lương cơ bản * 3
            Trưởng Phòng: Tổng lương = Lương cơ bản * 2
            Nhân Viên: Tổng lương = Lương cơ bản (Có thể không nhân thêm nếu chức vụ là Nhân Viên).
        5.Lưu đối tượng nhân viên:
          Sau khi tính toán, đối tượng nhân viên được lưu trữ vào một danh sách hoặc cơ sở dữ liệu.  
    3. Khối xuất kết quả (Output)
      Mục tiêu:
        Hiển thị kết quả cho người dùng sau khi nhân viên mới được tạo thành công và tính toán tổng lương.
      Kết quả đầu ra:
        1.Thông báo thành công:
          Nếu mọi thứ hợp lệ và đối tượng nhân viên được tạo thành công, hệ thống sẽ hiển thị thông báo như "Tạo nhân viên thành công!"
        2.Hiển thị thông tin nhân viên:
          Sau khi tạo nhân viên thành công, thông tin nhân viên bao gồm tài khoản, tên, chức vụ, lương cơ bản, và tổng lương sẽ được hiển thị. Tổng lương được tính tự động dựa trên chức vụ của nhân viên.
        3.Danh sách nhân viên cập nhật:
          Sau khi nhân viên mới được tạo, danh sách nhân viên có thể được hiển thị trên giao diện, ví dụ trong bảng danh sách nhân viên.          
   * 
   */
  // Method to calculate total salary based on position
  calculateTotalSalary() {
    const baseSalary = this.salary;
    let multiplier = 1;

    switch (this.position) {
      case "0": // Giám đốc
        multiplier = 3;
        break;
      case "1": // Trưởng phòng
        multiplier = 2;
        break;
      case "2": // Nhân viên
        multiplier = 1;
        break;
      default:
        console.error("Invalid position:", this.position);
    }

    return baseSalary * multiplier;
  }

  /**
   * 
   * 1. Khối nhập liệu (Input)
      Mục tiêu:
        Thu thập thông tin từ người dùng qua form nhập liệu, bao gồm các thông tin cơ bản để tạo đối tượng nhân viên và xếp loại dựa trên giờ làm.
      Dữ liệu đầu vào:
        Người dùng sẽ nhập thông tin vào form như sau:
          Tài khoản: Tối đa 4-6 ký tự số, không để trống.
          Họ tên: Phải là chữ, không để trống.
          Email: Phải có định dạng hợp lệ, không để trống.
          Mật khẩu: Phải có từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, và 1 ký tự đặc biệt, không để trống.
          Ngày làm: Không để trống, phải ở định dạng mm/dd/yyyy.
          Lương cơ bản: Phải trong khoảng từ 1,000,000 đến 20,000,000 VND, không để trống.
          Chức vụ: Chọn từ các giá trị hợp lệ: Giám đốc, Trưởng Phòng, Nhân Viên.
          Giờ làm trong tháng: Phải trong khoảng từ 80 - 200 giờ, không để trống.
    2. Khối xử lý (Process)
      Mục tiêu:
        Xử lý dữ liệu nhập từ form, kiểm tra tính hợp lệ của các thông tin, tạo đối tượng nhân viên và xếp loại nhân viên dựa trên số giờ làm.
      Các bước xử lý:
        1.Lấy dữ liệu từ form:
          Khi người dùng gửi form, dữ liệu từ các trường trong form sẽ được lấy ra.
        2.Kiểm tra tính hợp lệ của dữ liệu (Validation):
          Các trường như tài khoản, email, mật khẩu, giờ làm, v.v... cần được kiểm tra để đảm bảo hợp lệ. Nếu có dữ liệu sai, hệ thống sẽ hiển thị thông báo lỗi cho người dùng.
        3.Tạo đối tượng nhân viên:
          Nếu tất cả các thông tin hợp lệ, đối tượng nhân viên sẽ được tạo với các thuộc tính đã nhập.
        4.Xếp loại nhân viên:
          Dựa trên số giờ làm trong tháng, xếp loại nhân viên vào một trong các loại sau:
            Nhân viên xuất sắc: Giờ làm >= 192 giờ.
            Nhân viên giỏi: Giờ làm >= 176 giờ.
            Nhân viên khá: Giờ làm >= 160 giờ.
            Nhân viên trung bình: Giờ làm < 160 giờ.
        5.Lưu đối tượng nhân viên:
          Đối tượng nhân viên được lưu vào danh sách hoặc cơ sở dữ liệu để có thể sử dụng sau này.
    3. Khối xuất kết quả (Output)
      Mục tiêu:
        Hiển thị kết quả cho người dùng sau khi nhân viên mới được tạo và xếp loại theo giờ làm.
      Kết quả đầu ra:
        1.Thông báo thành công:
          Hệ thống sẽ thông báo khi tạo nhân viên thành công, ví dụ: "Tạo nhân viên thành công!"
        2.Hiển thị thông tin nhân viên:
          Sau khi tạo nhân viên, hệ thống sẽ hiển thị thông tin nhân viên bao gồm tài khoản, tên, chức vụ, lương cơ bản, tổng lương và loại nhân viên.
        3.Danh sách nhân viên cập nhật:
          Các thông tin nhân viên sẽ được hiển thị trong bảng danh sách nhân viên, bao gồm thông tin về giờ làm và loại nhân viên.          
   * 
   */
  // Method to classify employee based on working hours
  calculateRanking() {
    if (this.time >= 192) return "Xuất sắc";
    if (this.time >= 176) return "Giỏi";
    if (this.time >= 160) return "Khá";
    return "Trung bình";
  }
}
