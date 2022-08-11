const { Schema, default: mongoose } = require("mongoose");

const slideImageSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SlideImageSchema", slideImageSchema);
