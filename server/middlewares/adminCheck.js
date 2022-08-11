const userSchema = require("../models/userSchema");
require("dotenv").config();

const adminCheck = async (req, res, next) => {
  const userId = req.user._id;

  const adminUser = await userSchema.findById({ _id: userId }).exec();

  if (adminUser.role != process.env.ADMIN_ROLE) {
    res.status(403).json({
      err: "Access denied.",
    });
  } else {
    next();
  }
};

module.exports = adminCheck;
