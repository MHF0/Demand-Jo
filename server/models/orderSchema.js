const { Schema, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    orderTotal: {
      type: Number,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    orderStatus: {
      type: String,
      default: "الدفع عند التوصيل",
      enum: [
        "لم تتم معالجتها بعد",
        "يتم المعالجة",
        "لقد تم الارسال",
        "ألغيت",
        "مكتمل",
        "مرتجع",
      ],
    },

    isDone: { type: Boolean, default: false },

    isDeleted: { type: Boolean, default: false },

    paymentIntent: {},
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
