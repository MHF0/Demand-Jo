const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { password, phoneNumber } = req.body;

    const user2 = await userSchema.findOne({ phoneNumber: phoneNumber });

    const user = await userSchema.findOne({
      email: req.body.email,
    });

    if (!user) {
      const match = await bcrypt.compare(password, user2.password);

      const options = {
        expiresIn: "10000d",
      };
      if (match) {
        const token = jwt.sign(
          { _id: user2._id },
          process.env.JWT_SECRET,
          options
        );
        return res.status(200).json({
          message: "Login Successful",
          token,
          userId: user2._id,
          role: user2.role,
        });
      }
    } else {
      const match = await bcrypt.compare(
        password,
        user.password || user2.password
      );

      const options = {
        expiresIn: "10000d",
      };
      if (match) {
        const token = jwt.sign(
          { _id: user._id || user2._id },
          process.env.JWT_SECRET,
          options
        );
        return res.status(200).json({
          message: "Login Successful",
          token,
          userId: user._id || user2._id,
          role: user.role || user2.role,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = login;
