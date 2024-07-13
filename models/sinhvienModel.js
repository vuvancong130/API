const mongoose = require("mongoose");
const sinhvienShema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const sinhvien = mongoose.model("student", sinhvienShema);
module.exports = sinhvien;
