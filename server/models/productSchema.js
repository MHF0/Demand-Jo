const { Schema, default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
  {
    image: [
      {
        original: { type: String, required: true },
        thumbnail: { type: String, required: true },
      },
    ],
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    subCategory: { type: ObjectId, ref: "SubCategory", required: true },
    brand: { type: ObjectId, ref: "Brand" },
    size: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    theSeller: { type: String, required: true },
    productNum: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
