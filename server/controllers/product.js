const productSchema = require("../models/productSchema");

const createProduct = (req, res) => {
  const product = new productSchema(req.body);
  product
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};
// Get Products
const getAllProduct = (req, res) => {
  productSchema
    .find({ isDeleted: false })
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .sort({ createdAt: -1 })
    .limit(8)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getProductByCategory = (req, res) => {
  productSchema
    .find({ category: req.params.name })
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getProductBySubCategory = (req, res) => {
  productSchema
    .find({ subCategory: req.params.name })
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getProductByBrand = (req, res) => {
  productSchema
    .find({ brand: req.params.name })
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getProductByCategoryAndSubCategory = (req, res) => {
  productSchema
    .find({
      category: req.params.category,
      subCategory: req.params.subCategory,
    })
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getProductBySearch = (req, res) => {
  productSchema
    .find({
      $or: [{ name: { $regex: req.params.name, $options: "i" } }],
    })
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

//

const updateProduct = (req, res) => {
  productSchema
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const deleteProduct = (req, res) => {
  productSchema
    .findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getProductById = (req, res) => {
  productSchema
    .findById(req.params.id)
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getAllProductAdmins = (req, res) => {
  productSchema
    .find({ isDeleted: false })
    .populate("category")
    .populate("subCategory")
    .populate("brand")
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductByCategory,
  getProductBySubCategory,
  getProductByBrand,
  getProductByCategoryAndSubCategory,
  updateProduct,
  deleteProduct,
  getProductBySearch,
  getProductById,
  getAllProductAdmins,
};
