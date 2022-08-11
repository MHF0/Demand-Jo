const addressSchema = require("../models/addressSchema");

const createAddress = (req, res) => {
  const { street, address, city, state, zip } = req.body;
  const user = req.user._id;
  const addressData = new addressSchema({
    user,
    address,
    street,
    city,
    state,
  });
  addressData
    .save()
    .then(() =>
      res.status(201).json({ message: "Address created successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

const updateAddress = (req, res) => {
  const { id } = req.params;
  const user = req.user._id;
  const { street, address, city, state } = req.body;
  addressSchema
    .findByIdAndUpdate(
      id,
      { user, street, address, city, state},
      { new: true }
    )
    .then(() =>
      res.status(200).json({ message: "Address updated successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

const deleteAddress = (req, res) => {
  const { id } = req.params;
  addressSchema
    .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then(() =>
      res.status(200).json({ message: "Address deleted successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

const getAddressByUser = (req, res) => {
  const user = req.user._id;
  addressSchema
    .find({ user, isDeleted: false })
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(500).json({ error: err }));
};

const getAddressByAdmin = (req, res) => {
  const user = req.params.id;
  addressSchema
    .find({ user, isDeleted: false })
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(500).json({ error: err }));
};

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddressByUser,
  getAddressByAdmin
};
