const { Schema, default: mongoose } = require("mongoose");

const brandSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Brand", brandSchema);
