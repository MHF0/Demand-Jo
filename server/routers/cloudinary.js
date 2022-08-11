const express = require("express");

const cloudinaryRouter = express.Router();

const { upload, remove } = require("../controllers/cloudinary");

cloudinaryRouter.post("/uploadimages", upload);
cloudinaryRouter.post("/removeimage", remove);

module.exports = cloudinaryRouter;
