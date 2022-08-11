const { Schema, default: mongoose } = require("mongoose");

const subCategorySchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SubCategory", subCategorySchema);
