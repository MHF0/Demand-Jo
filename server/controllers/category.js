const categorySchema = require("../models/categorySchema");

const createCategory = (req, res) => {
  const { name, image } = req.body;
  const category = new categorySchema({ name, image });
  category
    .save()
    .then(() =>
      res.status(201).json({ message: "Category created successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

const getAllCategories = (req, res) => {
  categorySchema
    .find({ isDeleted: false })
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(500).json({ error: err }));
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  categorySchema
    .findByIdAndUpdate(id, { name, image }, { new: true })
    .then(() =>
      res.status(200).json({ message: "Category updated successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  categorySchema
    .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then(() =>
      res.status(200).json({ message: "Category deleted successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
