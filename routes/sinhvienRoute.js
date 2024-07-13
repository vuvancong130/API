//chua cac API
const express = require("express"); //tham chieu thu vien
const router = express.Router(); //dieu huong loi goi ham
const sinhvien = require("../models/sinhvienModel"); //tham chieu den model

//GET
router.get("/", async (req, res) => {
  //khi nguoi dung goi localhost:3000/
  try {
    const sinhviens = await sinhvien.find(); //lay tat ca sinh vien co trong bang du lieu
    //res.json(sinhviens);//tra ve json
    res.render("sinhviens", { sinhviens: sinhviens }); //tra ve file ejs
    console.log(sinhviens); //ghi ra log neu can
  } catch (err) {
    console.error(err); //in ra loi
    res.status(500).json({ error: "Khong ket noi duoc voi server" });
  }
});
//POST: tao moi 1 sinh vien
//http://localhost:3000/sinhvien
router.post("/", async (req, res) => {
  try {
    const { id, name } = req.body; //nhap id, name
    const sinhvien1 = new sinhvien({ id, name }); //tao doi tuong sv1 voi 2 gia tri nhap vao
    await sinhvien1.save(); //luu vao csdl
    res.status(201).json(sinhvien1); //tra ve ket qua cho nguoi dung biet
    console.log(sinhvien1);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "khong ket noi duoc voi server" });
  }
});
//PUT: cap nhat thong tin sinh vien
//http://localhost:3000/sinhvien/:_id
router.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params; //nhan tham so truyen
    const { name, id } = req.body; //lay noi dung nguoi dung nhap
    //thuc hien update
    const updatedSinhVien = await sinhvien.findByIdAndUpdate(
      _id,
      { id, name },
      { new: true }
    );
    res.json(updatedSinhVien); //tra ket qua cho nguoi dung
    console.log(updatedSinhVien); //in ra ket qua
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Khong ket noi duoc voi server" });
  }
});

// DELETE: Xóa một sinh viên
router.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedSinhVien = await SinhVien.findByIdAndDelete(_id);
    if (!deletedSinhVien) {
      return res.status(404).json({ error: "Sinh viên không tồn tại" });
    }
    res.json({ message: "Xóa sinh viên thành công" });
    console.log("Xóa sinh viên thành công:", deletedSinhVien);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Không thể xóa sinh viên" });
  }
});

module.exports = router;
