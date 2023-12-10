/*
Controller: 
- Tên Controler (Hay gọi tắt là controller)
- Action --> Hành động

Ví dụ: Controller Users sẽ có các action: 
- Thêm
- Sửa
- Xóa
- Hiển thị
*/

const homeController = {
  index: (req, res) => {
    //Tiếp nhận request
    //Xử lý dữ liệu của request: Validate
    //Truy vấn với Database --> Thông qua Model
    //Trả về response
    const title = "<i>Học Back-End dễ hơn Front-End</i>";
    const check = false;
    const users = ["User 1", "User 2", "User 3"];
    res.render("home/index", { title, check, users });
  },

  showProducts: (req, res) => {
    res.render("home/products", { layout: false });
  },
};

export default homeController;
