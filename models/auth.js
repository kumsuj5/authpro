const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    userType: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
