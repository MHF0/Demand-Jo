const UserSchema = require("../models/userSchema");

const getUserById = (req, res) => {
  const _id = req.user._id;
  UserSchema.findById(_id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err));
};

module.exports = { getUserById };
