const orderSchema = require("../models/orderSchema");
const cartSchema = require("../models/cartSchema");

const createOrder = async (req, res) => {
  const orderBy = req.user._id;

  const userCart = await cartSchema.findOne({ orderBy }).exec();

  let finalAmount = 0;

  if (userCart) {
    finalAmount = userCart.cartTotal;
  }

  const newOrder = new orderSchema({
    paymentIntent: {
      amount: finalAmount,
      currency: "JD",
      status: "الدفع عند التوصيل",
      created: Date.now(),
    },
    products: userCart.products,
    orderTotal: finalAmount,
    isDelivered: false,
    orderStatus: "لم تتم معالجتها بعد",
    orderBy: orderBy,
  });

  newOrder
    .save()
    .then((order) => {
      cartSchema
        .deleteOne({ orderBy })
        .then(() => {
          res.status(200).json({
            message: "Order created successfully",
            order: order,
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Create order failed");
    });
};

const changeIsDelivered = (req, res) => {
  const orderId = req.params.orderId;
  orderSchema
    .findByIdAndUpdate(orderId, { isDelivered: true }, { new: true })
    .then((order) => {
      res.status(200).json({
        message: "Order status updated successfully",
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const getOrderHistory = (req, res) => {
  const orderBy = req.user._id;
  orderSchema
    .find({ orderBy, isDelivered: false, isDeleted: false })
    .populate("products.product")
    .then((orders) => {
      res.status(200).json({
        message: "Order history fetched successfully",
        orders: orders,
      });
    })
    .catch((err) => {
      res.status(500).JSON(err);
    });
};

const getIsDelevered = (req, res) => {
  const orderBy = req.user._id;
  orderSchema
    .find({ orderBy, isDelivered: true })
    .populate("products.product")
    .then((orders) => {
      res.status(200).json({
        message: "Order history fetched successfully",
        orders: orders,
      });
    })
    .catch((err) => {
      res.status(500).JSON(err);
    });
};

const AdminGetOrderHistory = (req, res) => {
  orderSchema
    .find({ isDone: false })
    .sort("-createdAt")
    .populate("orderBy")
    .populate("products.product")
    .then((orders) => {
      res.status(200).json({
        message: "Order history fetched successfully",
        orders: orders,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const changeIsDone = (req, res) => {
  const orderId = req.params.orderId;
  orderSchema
    .findByIdAndUpdate(orderId, { isDone: true }, { new: true })
    .then((order) => {
      res.status(200).json({
        message: "Order status updated successfully",
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const orderStatusUpdate = (req, res) => {
  const orderId = req.params.orderId;
  const orderStatus = req.body.orderStatus;
  orderSchema
    .findByIdAndUpdate(orderId, { orderStatus }, { new: true })
    .then((order) => {
      res.status(200).json({
        message: "Order status updated successfully",
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const isDeleted = (req, res) => {
  const orderId = req.params.orderId;
  orderSchema
    .findByIdAndUpdate(orderId, { isDeleted: true }, { new: true })
    .then((order) => {
      res.status(200).json({
        message: "Order status updated successfully",
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  createOrder,
  changeIsDelivered,
  getOrderHistory,
  AdminGetOrderHistory,
  orderStatusUpdate,
  getIsDelevered,
  isDeleted,
  changeIsDone
};
