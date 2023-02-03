const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  profession: { type: String },
  images: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "profile" },
});
module.exports = Service = mongoose.model("service", serviceSchema);
