import Employee from "./../models/employee.js";
import EmployeeList from "./../models/employee-list.js";
import Validation from "./../models/validation.js";

// create new object from class Validation
const validation = new Validation();

// create new object from class EmployeeList
const employeeList = new EmployeeList();

export const getEleId = (id) => document.getElementById(id);

/**
 * 
 * 1. Khối nhập liệu (Input)
    Mục tiêu:
      Thu thập thông tin từ người dùng qua form nhập liệu để tạo ra một đối tượng nhân viên với các thuộc tính như tài khoản, họ tên, email, mật khẩu, ngày làm, lương cơ bản, chức vụ, giờ làm trong tháng, tổng lương và loại nhân viên.
    Dữ liệu đầu vào:
      Tài khoản: Mã định danh duy nhất của nhân viên.
      Họ tên: Tên đầy đủ của nhân viên.
      Email: Địa chỉ email của nhân viên.
      Mật khẩu: Mật khẩu để truy cập vào hệ thống (nên mã hóa).
      Ngày làm: Ngày nhân viên bắt đầu làm việc tại công ty.
      Lương cơ bản: Mức lương cố định hàng tháng của nhân viên.
      Chức vụ: Chức vụ của nhân viên, có thể là: Giám đốc, Trưởng Phòng, Nhân Viên.
      Giờ làm trong tháng: Số giờ làm việc của nhân viên trong tháng.
      Tổng lương: Lương tính theo công thức (lương cơ bản + các phụ cấp khác nếu có).
      Loại nhân viên: Loại hình nhân viên (e.g., Toàn thời gian, Bán thời gian).
    Nguồn dữ liệu:
      Giao diện người dùng (UI): Dữ liệu được thu thập từ các trường nhập liệu (input fields) trên form HTML.
  2. Khối xử lý (Process)
    Mục tiêu:
      Xử lý dữ liệu đầu vào, tạo đối tượng nhân viên mới từ thông tin người dùng nhập vào và tính toán các thuộc tính như tổng lương.
    Các bước xử lý chính:
      1.Lấy dữ liệu từ form:
        Sau khi người dùng gửi form, các giá trị từ các trường nhập liệu sẽ được lấy ra và sử dụng để tạo đối tượng nhân viên.
        Các giá trị này cần được kiểm tra tính hợp lệ (ví dụ, kiểm tra xem tất cả các trường có hợp lệ không, đặc biệt là các số liệu như lương và giờ làm).
      2.Tạo đối tượng nhân viên:
        Sử dụng các thông tin đã nhập để khởi tạo một đối tượng nhân viên mới.
        Tính toán tổng lương dựa trên lương cơ bản và giờ làm trong tháng (nếu có).
        Ví dụ tính tổng lương: Nếu nhân viên là toàn thời gian, có thể tính tổng lương là lương cơ bản + một phần trăm phụ cấp. Nếu là bán thời gian, tính theo số giờ làm thực tế.
      3.Tính toán tổng lương:
        Công thức tính tổng lương
          +nếu chức vụ là giám đốc: tổng lương = lương cơ bản * 3
          +nếu chức vụ là trưởng phòng: tổng lương = lương cơ bản * 2
          +nếu chức vụ là nhân viên: tổng lương = lương cơ bản *
      4.Xử lý mật khẩu:
        Mật khẩu cần được mã hóa trước khi lưu trữ (nếu cần thiết), không lưu mật khẩu gốc trong hệ thống.
  3. Khối xuất kết quả (Output)
    Mục tiêu:
      Hiển thị kết quả sau khi tạo đối tượng nhân viên, bao gồm việc thông báo thành công và hiển thị thông tin nhân viên mới trong giao diện người dùng.
    Kết quả đầu ra:
      1.Thông báo kết quả:
        Sau khi tạo đối tượng nhân viên thành công, hệ thống sẽ hiển thị một thông báo cho người dùng (ví dụ: "Tạo nhân viên thành công!").
        Nếu có lỗi trong quá trình nhập liệu (như thiếu thông tin), hệ thống sẽ thông báo lỗi cho người dùng.
      2.Hiển thị thông tin nhân viên:
        Sau khi tạo thành công, thông tin về nhân viên mới có thể được hiển thị trên giao diện người dùng, ví dụ trong bảng danh sách nhân viên, hoặc hiển thị chi tiết nhân viên.
      3.Cập nhật giao diện người dùng:
        Có thể tạo một bảng để hiển thị tất cả nhân viên, hoặc hiển thị thông tin nhân viên vừa tạo ngay trên màn hình.
 * 
 */
const getInfoEmployee = (isAdd) => {
  // Get value from input
  const employeeAccount = getEleId("tknv").value;
  const employeeName = getEleId("name").value;
  const employeeEmail = getEleId("email").value;
  const employeePassword = getEleId("password").value;
  const employeeDate = getEleId("datepicker").value;
  const employeeSalary = getEleId("luongCB").value;
  const employeePosition = getEleId("chucvu").value;
  const employeeTime = getEleId("gioLam").value;

  //check validate
  let isValid = true;
  if (isAdd) {
    //Add employee
    //employeeAccount
    isValid &=
      validation.checkEmpty(
        employeeAccount,
        "invalidTKNV",
        "Tài khoản không được để trống"
      ) &&
      validation.checkLength(
        employeeAccount,
        "invalidTKNV",
        "Tài khoản phải từ 4 đến 6 ký tự"
      ) &&
      validation.checkAccountExist(
        employeeAccount,
        "invalidTKNV",
        "Tài khoản đã tồn tại",
        employeeList.arr
      );
  }

  // employeeName
  isValid &=
    validation.checkEmpty(
      employeeName,
      "invalidName",
      "Họ và tên không được để trống"
    ) &&
    validation.checkCharacterString(
      employeeName,
      "invalidName",
      "Họ và tên phải là chữ"
    );

  // employeeEmail
  isValid &=
    validation.checkEmpty(
      employeeEmail,
      "invalidEmail",
      "Email không được để trống"
    ) &&
    validation.checkEmail(
      employeeEmail,
      "invalidEmail",
      "Email không đúng định dạng"
    );

  // employeePassword
  isValid &=
    validation.checkEmpty(
      employeePassword,
      "invalidPassword",
      "Password không được để trống"
    ) &&
    validation.checkPassword(
      employeePassword,
      "invalidPassword",
      "Password phải từ 6 đến 10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  // employeeDate
  isValid &=
    validation.checkEmpty(
      employeeDate,
      "invalidDate",
      "Ngày làm không được để trống"
    ) &&
    validation.checkDate(
      employeeDate,
      "invalidDate",
      "Ngày làm không đúng định dạng"
    );

  // employeeSalary
  isValid &=
    validation.checkEmpty(
      employeeSalary,
      "invalidSalary",
      "Lương cơ bản không được để trống"
    ) &&
    validation.checkSalary(
      employeeSalary,
      "invalidSalary",
      "Lương cơ bản phải từ 1.000.000 đến 20.000.000"
    );

  // employeePosition
  isValid &= validation.checkEmpty(
    employeePosition,
    "invalidPosition",
    "Chức vụ không được để trống"
  );

  // employeeTime
  isValid &=
    validation.checkEmpty(
      employeeTime,
      "invalidTime",
      "Giờ làm không được để trống"
    ) &&
    validation.checkTime(
      employeeTime,
      "invalidTime",
      "Giờ làm phải từ 80h đến 200h"
    );

  if (!isValid) return null;
  // Create new Employee object from class Employee
  const employee = new Employee(
    employeeAccount,
    employeeName,
    employeeEmail,
    employeePassword,
    employeeDate,
    employeeSalary,
    employeePosition,
    employeeTime
  );
  // Calculate total salary based on position and hours worked
  employee.totalsalary = employee.calculateTotalSalary();

  // Classify employee based on working hours
  employee.rank = employee.calculateRanking();

  return employee;
};

/**
 * 1. Khối nhập liệu (Input)
    Mục tiêu:
      Thu thập danh sách nhân viên từ nguồn dữ liệu (có thể là tĩnh hoặc động).
    Dữ liệu đầu vào:
      Một danh sách (mảng hoặc cơ sở dữ liệu) các nhân viên với các thông tin:
        Tài khoản nhân viên: Một giá trị duy nhất định danh nhân viên (ID).
        Họ và tên: Tên đầy đủ của nhân viên.
        Email: Định danh email của nhân viên.
        Mật khẩu : Mật khẩu của nhân viên.
        Ngày làm: Ngày làm cơ bản của nhân viên.
        Chức vụ: Vai trò/chức vụ của nhân viên trong tổ chức.
        Phòng ban: Phòng ban mà nhân viên đang làm việc.
        Lương: Mức lương của nhân viên.
      . .vv
  2. Khối xử lý (Process)
    Mục tiêu:
      Xử lý danh sách nhân viên, định dạng dữ liệu và tạo cấu trúc HTML để hiển thị.
    Các bước xử lý chính:
      1.Kiểm tra dữ liệu:
        Xác định danh sách nhân viên có tồn tại và không rỗng.
        Đảm bảo dữ liệu nhân viên đầy đủ các thông tin cần thiết: tài khoản, tên, chức vụ, phòng ban, lương.
      2.Tạo bảng HTML:
        Khởi tạo phần đầu bảng (header) với các cột:
          Tài khoản nhân viên
          Họ và tên
          Chức vụ
          Ngày làm
          Lương
          .vv
        Duyệt qua từng nhân viên trong danh sách và tạo từng dòng (row) trong bảng với các thông tin tương ứng.
      3.Định dạng dữ liệu:
        Lương được định dạng để hiển thị dữ liệu
        Có thể bổ sung các thao tác kiểm tra (validation) hoặc xử lý lỗi dữ liệu.
      4.Kết hợp bảng vào giao diện:
        Thêm các dòng dữ liệu đã tạo vào thẻ <tbody> trong bảng HTML.
  3. Khối xuất kết quả (Output)
    Mục tiêu:
      Hiển thị danh sách nhân viên trong bảng trên giao diện người dùng.
    Kết quả đầu ra:
      Một bảng (table) với các thông tin chi tiết về nhân viên, bao gồm:
        Tài khoản nhân viên.
        Họ và tên.
        Chức vụ.
        Ngày làm.
        Lương.
      Phương thức xuất kết quả:
        Bảng được hiển thị trên giao diện web trong trình duyệt
 * 
 */
const renderEmployeeList = (data) => {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    content += `
            <tr>
                <td>${employee.account}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.date}</td>
                <td>
                    ${
                      employee.position === "0"
                        ? "Giám đốc"
                        : employee.position === "1"
                        ? "Trưởng phòng"
                        : "Nhân viên"
                    }
                </td>
                <td>${employee.totalsalary}</td>
                <td>${employee.rank}</td>
                <td>
                  <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEditEmployee('${
                    employee.account
                  }')">Edit</button>
                  <button class="btn btn-danger" onclick="handleDeleteEmployee('${
                    employee.account
                  }')" >Delete</button>
                </td>
            </tr>
        `;
  }
  getEleId("tableDanhSach").innerHTML = content;
};

getEleId("btnThem").onclick = function () {
  // edit title modal
  getEleId("header-title").innerHTML = "Add Employee"; // Đảm bảo thay tiêu đề chính xác

  // show button add Employee
  getEleId("btnThemNV").style.display = "inline-block"; // Hiển thị nút "Thêm nhân viên"

  // hide button update Employee
  getEleId("btnCapNhat").style.display = "none"; // Ẩn nút "Cập nhật"

  // reset value form
  getEleId("employeeForm").reset(); // Reset form để xóa dữ liệu cũ

  // enable input EmployeeID
  getEleId("tknv").removeAttribute("disabled"); // Bỏ khóa trường tài khoản
};

/**
 * Handle Edit employee
 */
const handleEditEmployee = (account) => {
  // edit title modal
  getEleId("header-title").innerHTML = "Edit Employee";
  // hide button add employee
  getEleId("btnThemNV").style.display = "none";
  // show button update employee
  getEleId("btnCapNhat").style.display = "inline-block";

  const employee = employeeList.editEmployee(account);

  if (employee) {
    // show value của employee ra form
    getEleId("tknv").value = employee.account;
    // disable input employeeID
    getEleId("tknv").setAttribute("disabled", true);

    getEleId("name").value = employee.name;
    getEleId("email").value = employee.email;
    getEleId("password").value = employee.password;
    getEleId("datepicker").value = employee.date;
    getEleId("luongCB").value = employee.salary;
    getEleId("chucvu").value = employee.position;
    getEleId("gioLam").value = employee.time;
  }
};

window.handleEditEmployee = handleEditEmployee;

/**
 * Handle Delete Employee
 * 
 *  1. Khối nhập liệu (Input)
    Mục tiêu:
      Thu thập thông tin từ người dùng qua form nhập liệu để tạo đối tượng nhân viên, đồng thời cung cấp cách thức để người dùng xóa nhân viên.
    Dữ liệu đầu vào:
      Người dùng cũng có thể chọn xóa một nhân viên bằng cách nhập hoặc chọn Tài khoản của nhân viên cần xóa.
  2. Khối xử lý (Process)
    Mục tiêu:
      Xóa nhân viên khỏi hệ thống.
    Các bước xử lý:
      1.Xử lý xóa nhân viên:
        Khi người dùng nhập tài khoản của nhân viên cần xóa vào form "Xóa nhân viên" và nhấn "Xóa nhân viên", hệ thống sẽ:
        Lấy tài khoản nhân viên cần xóa.
        Tìm nhân viên trong danh sách nhân viên với tài khoản đó.
        Nếu tìm thấy, xóa nhân viên khỏi danh sách.
        Nếu không tìm thấy, hiển thị thông báo lỗi.
  3. Khối xuất kết quả (Output)
    Mục tiêu:
      Hiển thị thông báo kết quả cho người dùng sau khi tạo hoặc xóa nhân viên.
    Kết quả đầu ra:
    1.Thông báo thành công:
      Sau khi tạo nhân viên thành công, hệ thống hiển thị thông báo "Tạo nhân viên thành công!".
      Sau khi xóa nhân viên thành công, hệ thống hiển thị thông báo "Xóa nhân viên thành công!".
    2.Danh sách nhân viên cập nhật:
      Sau khi nhân viên được tạo hoặc xóa, danh sách nhân viên sẽ được cập nhật.
      Các thông tin nhân viên sẽ được hiển thị trong bảng danh sách nhân viên.
 */
const handleDeleteEmployee = (account) => {
  // Remove employee from employeeList.arr
  employeeList.removeEmployee(account);

  // Render employee list
  renderEmployeeList(employeeList.arr);

  // Set Local Storage
  setLocalStorage();
};

// khai báo handleDeleteEmployee là global function => window
window.handleDeleteEmployee = handleDeleteEmployee;

/**
 * Set Local Storage
 */
const setLocalStorage = () => {
  const dataJSON = employeeList.arr;
  // Convert dataJSON to string
  const dataString = JSON.stringify(dataJSON);
  // Save dataString to localStorage
  localStorage.setItem("EMPLOYEE_LIST", dataString);
};

/**
 * Get Local Storage
 */
const getLocalStorage = () => {
  const dataString = localStorage.getItem("EMPLOYEE_LIST");

  if (!dataString) return;

  // convert dataString to data JSON
  const dataJSON = JSON.parse(dataString);
  // update employeeList.arr
  employeeList.arr = dataJSON;
  // Render employee list
  renderEmployeeList(employeeList.arr);
};

getLocalStorage();

/**
 * Add Employee
 * 
 * 1. Khối nhập liệu (Input)
    Mục tiêu:
      Thu thập dữ liệu đầu vào để thêm một nhân viên mới vào hệ thống (danh sách nhân viên).
    Dữ liệu đầu vào:
      Để thêm một nhân viên mới, người dùng cần nhập thông tin của nhân viên mới vào các trường nhập liệu (input fields). Các thông tin cần nhập bao gồm:
      Tài khoản nhân viên: Tài khoản số duy nhất để nhận diện nhân viên (account). Có thể tự động sinh tài khoản hoặc người dùng nhập.
      Họ và tên: Tên đầy đủ của nhân viên.
      Chức vụ: Vai trò của nhân viên trong tổ chức (e.g., Nhân viên, Trưởng phòng, Giám đốc).
      Lương: Mức lương của nhân viên (số tiền).
      .vv
    Nguồn dữ liệu:
      Từ giao diện người dùng (UI): Các thông tin này có thể được người dùng nhập vào qua một form hoặc các ô nhập liệu (textboxes).
    2. Kiểm tra hợp lệ: Trước khi tiếp nhận dữ liệu, có thể cần kiểm tra xem các trường dữ liệu có hợp lệ (không rỗng, đúng định dạng, không trùng lặp tài khoản nhân viên) hay không.
  2. Khối xử lý (Process)
    Mục tiêu:
      Tiến hành xử lý và xác nhận thông tin đã nhập từ khối nhập liệu, sau đó thêm nhân viên mới vào danh sách hoặc cơ sở dữ liệu.
    Các bước xử lý chính:
      1.Kiểm tra dữ liệu:
        Xác nhận tính hợp lệ: Kiểm tra các trường dữ liệu nhập vào (e.g., tài khoản nhân viên không trùng lặp, lương là số hợp lệ).
        Chức năng kiểm tra: Kiểm tra tính hợp lệ của tài khoản nhân viên (nếu là số, không trùng với tài khoản nhân viên đã có), kiểm tra định dạng tên (không chứa ký tự đặc biệt hay số), kiểm tra lương (phải là số dương).
      2.Thêm nhân viên vào danh sách:
        Nếu dữ liệu hợp lệ, thêm nhân viên mới vào danh sách nhân viên. Nếu hệ thống sử dụng cơ sở dữ liệu, có thể thêm vào cơ sở dữ liệu.
        Dữ liệu thêm vào có thể được lưu vào:
          Danh sách tạm thời: Nếu lưu trữ tạm thời trên trang web, chỉ cần cập nhật danh sách nhân viên.
          Cơ sở dữ liệu: Nếu hệ thống có cơ sở dữ liệu (ví dụ MySQL, MongoDB), thêm bản ghi mới vào cơ sở dữ liệu.
      3.Cập nhật giao diện:
        Sau khi thêm nhân viên thành công, có thể cập nhật giao diện để hiển thị thông tin nhân viên mới trong bảng danh sách nhân viên.
        Thông báo kết quả: Hiển thị thông báo thành công hoặc lỗi nếu dữ liệu không hợp lệ.
  3. Khối xuất kết quả (Output)
    Mục tiêu:
      Hiển thị kết quả sau khi thêm nhân viên mới vào hệ thống, bao gồm việc cập nhật danh sách nhân viên.
    Kết quả đầu ra:
      1.Cập nhật giao diện người dùng:
        Sau khi nhân viên mới được thêm thành công, giao diện sẽ tự động cập nhật để hiển thị nhân viên mới trong bảng danh sách nhân viên.
        Các thông tin về nhân viên như tài khoản nhân viên, họ tên, chức vụ, phòng ban, lương sẽ được hiển thị trong bảng.
      2.Thông báo cho người dùng:
        Thông báo cho người dùng kết quả của hành động thêm nhân viên (thành công hay lỗi). Có thể sử dụng các pop-up hoặc thông báo bên dưới form.
          Thông báo thành công: "Thêm nhân viên thành công."
          Thông báo lỗi: "tài khoản nhân viên đã tồn tại", "Lương không hợp lệ", v.v.
    */
getEleId("btnThemNV").onclick = function () {
  // Get Employee from form
  const employee = getInfoEmployee(true);

  if (!employee) return;

  // Add Employee to Employee list
  employeeList.addEmployee(employee);
  // Render Employee list
  renderEmployeeList(employeeList.arr);
  // Set Local Storage
  setLocalStorage();

  // close modal
  document.getElementsByClassName("btnDong")[0].click();
};

/**
 * Update Employee
 * 
 *1. Khối nhập liệu (Input)
    Mục tiêu:
      Thu thập thông tin từ người dùng qua form nhập liệu để tạo hoặc cập nhật đối tượng nhân viên.
    Dữ liệu đầu vào:
      Cập nhật nhân viên:
        Người dùng có thể nhập thông tin cần chỉnh sửa của nhân viên đã tồn tại.
        Cung cấp chức năng để người dùng chọn nhân viên theo Tài khoản và chỉnh sửa các thông tin của nhân viên đó (tất cả các trường có thể thay đổi, trừ Tài khoản).
  2. Khối xử lý (Process)
    Mục tiêu:
      Xử lý thông tin đầu vào, thực hiện validation, tạo hoặc cập nhật đối tượng nhân viên.
    Các bước xử lý:
      1.Xử lý cập nhật nhân viên:
        Kiểm tra tính hợp lệ của thông tin cần cập nhật:
          Kiểm tra tính hợp lệ của các trường dữ liệu giống như bước tạo mới nhân viên (tuy nhiên, chỉ cập nhật các trường có thay đổi).
        Tìm nhân viên cần cập nhật:
          Dựa trên tài khoản nhân viên, tìm nhân viên trong danh sách nhân viên hiện tại.
          Nếu tìm thấy, cập nhật thông tin nhân viên theo các giá trị mới từ form nhập liệu.
        Cập nhật tổng lương và loại nhân viên (nếu cần thiết):
          Nếu có thay đổi lương cơ bản hoặc chức vụ, tính lại tổng lương của nhân viên dựa trên các công thức (chức vụ x lương cơ bản).
          Cập nhật lại xếp loại nhân viên dựa trên số giờ làm trong tháng.
  3. Khối xuất kết quả (Output)
    Mục tiêu:
      Hiển thị kết quả cho người dùng sau khi tạo hoặc cập nhật nhân viên.
    Kết quả đầu ra:
      1.Thông báo thành công:
        Sau khi cập nhật nhân viên, hệ thống hiển thị thông báo "Cập nhật nhân viên thành công!".
      2.Danh sách nhân viên cập nhật:
        Sau khi tạo hoặc cập nhật nhân viên, danh sách nhân viên sẽ được cập nhật.
        Các nhân viên được liệt kê với các thông tin: tài khoản, họ tên, email, lương cơ bản, chức vụ, giờ làm trong tháng, tổng lương, và loại nhân viên.
 * 
 * 
 */
getEleId("btnCapNhat").onclick = function () {
  // Get employee from form
  const employee = getInfoEmployee(false);

  if (!employee) return;

  // Update employee to employee list
  employeeList.updateEmployee(employee);
  // Render employee list
  renderEmployeeList(employeeList.arr);
  // Set Local Storage
  setLocalStorage();
  // close modal
  document.getElementsByClassName("btnDong")[0].click();
};

/**
 * 
 * 1. Khối nhập liệu (Input)
    Mục tiêu:
      Thu thập thông tin từ người dùng để tạo đối tượng nhân viên và cho phép người dùng tìm kiếm nhân viên theo loại (xuất sắc, giỏi, khá, trung bình).
    Dữ liệu đầu vào:
      Tìm nhân viên theo loại:
        Người dùng có thể nhập loại nhân viên mà họ muốn tìm (nhân viên xuất sắc, giỏi, khá, trung bình).
        Loại nhân viên dựa vào số giờ làm trong tháng, ví dụ:
          Xuất sắc: Giờ làm >= 192h
          Giỏi: Giờ làm >= 176h
          Khá: Giờ làm >= 160h
          Trung bình: Giờ làm < 160h
  2. Khối xử lý (Process)
    Mục tiêu:
      Xử lý thông tin đầu vào, kiểm tra tính hợp lệ của dữ liệu, tính toán tổng lương và loại nhân viên, sau đó tìm kiếm nhân viên theo loại yêu cầu.
    Các bước xử lý:  
      1.Xử lý tìm kiếm nhân viên theo loại:
        Nhận yêu cầu tìm kiếm: Lấy loại nhân viên mà người dùng muốn tìm (Xuất sắc, Giỏi, Khá, Trung bình).
        Tìm nhân viên: Lọc danh sách nhân viên theo số giờ làm trong tháng và loại tương ứng.
        Hiển thị kết quả: Hiển thị các nhân viên phù hợp với loại yêu cầu.      
  3. Khối xuất kết quả (Output)
    Mục tiêu:
      Hiển thị kết quả cho người dùng sau khi tạo nhân viên và tìm kiếm nhân viên theo loại.
    Kết quả đầu ra:
      1.Danh sách nhân viên tìm kiếm theo loại:
        Khi người dùng tìm kiếm theo loại, kết quả tìm kiếm sẽ được hiển thị trong một danh sách. Mỗi nhân viên sẽ được liệt kê với thông tin cơ bản như: họ tên, tài khoản và tổng lương.
 */
// Hàm tìm kiếm xếp loại nhân viên (tích hợp logic loại bỏ dấu)
const handleSearchRank = () => {
  const searchValue = getEleId("searchName").value.trim(); // Lấy giá trị nhập vào

  // Chuẩn hóa giá trị nhập (xóa dấu, chuyển về chữ thường)
  const normalizedSearchValue = searchValue
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

  // Nếu ô tìm kiếm trống, hiển thị toàn bộ danh sách nhân viên
  if (!normalizedSearchValue) {
    renderEmployeeList(employeeList.arr);
    return;
  }

  // Lọc nhân viên theo loại
  const filteredEmployees = employeeList.arr.filter((employee) => {
    // Chuẩn hóa xếp loại nhân viên (xóa dấu, chuyển về chữ thường)
    const normalizedRank = employee.rank
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();

    return normalizedRank.includes(normalizedSearchValue);
  });

  // Hiển thị danh sách nhân viên phù hợp
  renderEmployeeList(filteredEmployees);
};

// Thêm sự kiện tìm kiếm
getEleId("searchName").addEventListener("keyup", handleSearchRank);
