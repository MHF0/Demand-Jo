const SubCategorySchema = require("../models/subCategory");

const createSubCategory = (req, res) => {
  const { name, category } = req.body;
  const subCategory = new SubCategorySchema({
    name,
    category,
  });
  subCategory
    .save()
    .then((result) => {
      res.status(200).json({
        message: "SubCategory created successfully.",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating SubCategory.",
        err,
      });
    });
};

const getSubCategory = (req, res) => {
  SubCategorySchema.find()
    .populate("category")
    .then((subCategories) => {
      res.status(200).json({
        message: "SubCategories fetched successfully.",
        subCategories,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching SubCategories.",
        err,
      });
    });
};

const updateSubCategory = (req, res) => {
  const { name, categoryId, image } = req.body;
  const subCategoryId = req.params.id;
  SubCategorySchema.findByIdAndUpdate(
    subCategoryId,
    {
      name,
      categoryId,
      image,
    },
    { new: true }
  )
    .then((subCategory) => {
      res.status(200).json({
        message: "SubCategory updated successfully.",
        subCategory,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating SubCategory.",
        err,
      });
    });
};

const deleteSubCategory = (req, res) => {
  const subCategoryId = req.params.id;
  SubCategorySchema.findByIdAndDelete(subCategoryId)
    .then((subCategory) => {
      res.status(200).json({
        message: "SubCategory deleted successfully.",
        subCategory,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting SubCategory.",
        err,
      });
    });
};

const getSubCategoryByCategoryId = (req, res) => {
  const categoryId = req.params.id;
  SubCategorySchema.find({ categoryId })
    .then((subCategories) => {
      res.status(200).json({
        message: "SubCategories fetched successfully.",
        subCategories,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching SubCategories.",
        err,
      });
    });
};

module.exports = {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryByCategoryId,
};
