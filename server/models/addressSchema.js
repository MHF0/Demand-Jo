const { Schema, default: mongoose } = require("mongoose");

const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Address", addressSchema);
