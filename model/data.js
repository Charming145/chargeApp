const mongoose = require("mongoose");
const token = require("../config/tokenGen");
const Data = mongoose.model(
  "data",
  new mongoose.Schema({
    code: String,
    name: String,
    phone_qty: Number,
    pb_qty: Number,
    laptop_qty: Number,
    retrived: { type: Boolean, default: false },
    timeStamp: {
      type: Date,
      default: Date.now(),
    },
  }),
  "devices"
);

exports.addDevice = (data, cb) => {
  let newDevice = new Data({
    name: data.name ? data.name : "Customer",
    phone_qty: data.phone_qty ? data.phone_qty : 0,
    pb_qty: data.pb_qty ? data.pb_qty : 0,
    laptop_qty: data.laptop_qty ? data.laptop_qty : 0,
  });
  newDevice.code = token.genToken();
  newDevice.save().then((done) => {
    if (!done) return cb(null);
    cb(done);
  });
};
exports.updateData = (data, cb) => {
  console.log(data);
  const id = mongoose.Types.ObjectId.createFromHexString(data.id);
  Data.findByIdAndUpdate(id, {
    $set: {
      name: data.name,
      phone_qty: data.phone_qty,
      pb_qty: data.pb_qty,
      laptop_qty: data.laptop_qty,
      retrived: data.retrived,
      // retrived: data.retrived == "true" ? true : false,
    },
  })
    .then((f) => {
      if (f) return cb(true);
      return cb(false);
    })
    .catch((err) => cb(false));
};
exports.fetchData = (cb) => {
  Data.find({}).then((d) => cb(d));
};
exports.fetchDataById = (param, cb) => {
  Data.find({
    $or: [{ code: { $regex: param } }, { name: { $regex: param } }],
  })
    .then((d) => cb(d))
    .catch((err) => cb([]));
};
exports.fetchDataByCode = (param, cb) => {
  Data.find({
    $or: [{ code: param }, { name: param }],
  })
    .then((d) => cb(d))
    .catch((err) => cb([]));
};
