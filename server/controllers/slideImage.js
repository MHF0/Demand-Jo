const SlideImageSchema = require("../models/slideImageSchema");

const createSlideImage = (req, res) => {
  const { image } = req.body;
  const slideImage = new SlideImageSchema({ image });
  slideImage
    .save()
    .then(() =>
      res.status(201).json({ message: "Slide image created successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

const getSlideImage = (req, res) => {
  SlideImageSchema.find({ isDeleted: false })
    .then((slideImages) => res.status(200).json(slideImages))
    .catch((err) => res.status(500).json({ error: err }));
};

const updateSlideImage = (req, res) => {
  const { _id } = req.params;
  const { image, name, description } = req.body;
  SlideImageSchema.findByIdAndUpdate(
    _id,
    { image },
    { new: true }
  )
    .then(() =>
      res.status(200).json({ message: "Slide image updated successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

const deleteSlideImage = (req, res) => {
  const { id } = req.params;
  SlideImageSchema.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then(() =>
      res.status(200).json({ message: "Slide image deleted successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

module.exports = {
  createSlideImage,
  getSlideImage,
  updateSlideImage,
  deleteSlideImage,
};
