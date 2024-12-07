class EmployeeList {
  constructor() {
    this.arr = [];
  }

  addEmployee(employee) {
    this.arr.push(employee);
  }

  /**
   * 0. Tao bien index = -1 
     1. Duyet qua từng phần tử trong mảng arr
      1.1. employee = arr[i]
      1.2. Nếu account (user xoá) trùng với employee.account 
        => Đúng: gán i cho index
        => break;
      2. trả index
   */
  findIndexEmployee(account) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const employee = this.arr[i];
      if (employee.account === account) {
        index = i;
        break;
      }
    }
    return index;
  }

  removeEmployee(account) {
    // Tìm vị trí của Employee cần xoá
    const index = this.findIndexEmployee(account);

    // Xoá Employee khỏi mảng
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  editEmployee(account) {
    // Tìm vị trí của Employee cần edit
    const index = this.findIndexEmployee(account);
    // Lấy Employee từ vị trí tìm thấy trong mảng
    if (index !== -1) {
      // trả về Employee
      return this.arr[index];
    }

    return null;
  }
  
  updateEmployee(employee) {
    // Tìm vị trí của employee cần update
    const index = this.findIndexEmployee(employee.account);

    if (index !== -1) {
      this.arr[index] = employee;
    }
  }

  searchEmployee(keyword) {
    /**
     * 0. Tao mảng result = []
     * 1. Duyệt qua từng phần tử trong mảng arr
     *    1.1. employee = arr[i]
     *    1.2. Nếu employee.name trùng với keyword
     *        => Đúng: thêm employee vào result
     * 2. trả về result
     */
    let result = [];
    for (let i = 0; i < this.arr.length; i++) {
      const employee = this.arr[i];
      // chuyển keyword và employee.name về chữ thường
      const keywordLowerCase = keyword.toLowerCase();
      const employeeNameLowerCase = employee.name.toLowerCase();

      if (employeeNameLowerCase.indexOf(keywordLowerCase) !== -1) {
        result.push(employee);
      }
    }
    return result;
  }
}
export default EmployeeList;
