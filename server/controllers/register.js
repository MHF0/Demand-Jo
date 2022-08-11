const userSchema = require("../models/userSchema");

const register = async (req, res, next) => {
  const { phoneNumber, password, fullName, companyName, email } = req.body;

  const newUser = new userSchema({
    phoneNumber,
    password,
    fullName,
    companyName,
    email,
  });

  try {
    await newUser.save();
    next();
  } catch (error) {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  }
};

module.exports = { register };
