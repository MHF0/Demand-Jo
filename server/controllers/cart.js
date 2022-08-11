const cartSchema = require("../models/cartSchema");
const productSchema = require("../models/productSchema");

const addToCart = async (req, res) => {
  const orderBy = req.user._id;

  const { cart } = req.body;

  let product = [];

  //   cehck if this is the user that is adding to cart

  const cartExistByThisUser = await cartSchema.findOne({ orderBy });

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    const _id = cart[i]._id;
    object.product = cart[i]._id;
    object.count = cart[i].count;

    let productFromDB = await productSchema.findById(_id).exec();

    object.price = productFromDB.price;

    product.push(object);
  }

  const cartTotal = product.reduce((acc, curr) => {
    return acc + curr.price * curr.count;
  }, 0);

  let newCart = new cartSchema({
    products: product,
    cartTotal,
    orderBy: orderBy,
  });

  newCart
    .save()
    .then((data) => {
      res.status(200).json({
        message: "Added to cart",
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error adding cart",
        err,
      });
    });
};

const getCartByUser = (req, res) => {
  const orderBy = req.user._id;
  cartSchema
    .findOne({ orderBy })
    .populate({
      path: "products",
      populate: { path: "product" },
    })
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const deleteFromCart = (req, res) => {
  cartSchema
    .findOneAndDelete(req.user._id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateCart = (req, res) => {
  cartSchema
    .findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  addToCart,
  getCartByUser,
  deleteFromCart,
  updateCart,
};
