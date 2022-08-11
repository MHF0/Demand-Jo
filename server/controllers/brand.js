const BrandSchema = require("../models/brandSchema");

const createBrand = (req, res) => {
  const { name, image } = req.body;
  const brand = new BrandSchema({ name, image });
  brand
    .save()
    .then(() => res.status(201).json({ message: "Brand created successfully" }))
    .catch((err) => res.status(500).json({ error: err }));
};

const getBrand = (req, res) => {
  BrandSchema.find({ isDeleted: false })
    .then((brands) => res.status(200).json(brands))
    .catch((err) => res.status(500).json({ error: err }));
};

const updateBrand = (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  BrandSchema.findByIdAndUpdate(id, { name, image }, { new: true })
    .then(() => res.status(200).json({ message: "Brand updated successfully" }))
    .catch((err) => res.status(500).json({ error: err }));
};

const deleteBrand = (req, res) => {
  const { id } = req.params;
  BrandSchema.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then(() => res.status(200).json({ message: "Brand deleted successfully" }))
    .catch((err) => res.status(500).json({ error: err }));
};

module.exports = {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};
