const { Schema, default: mongoose } = require("mongoose");

const cartSchema = new Schema(
  {
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        count: Number,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
