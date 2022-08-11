const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, unique: true },
    role: { type: String, required: true, default: "user" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
  this.email = this.email.toLowerCase();
});

module.exports = mongoose.model("User", userSchema);
