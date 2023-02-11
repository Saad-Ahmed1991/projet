const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  profession: { type: String, required: true },
  images: { type: [String], default: [] },
  totalRating: { type: Number, default: 1 },
  ratingNumber: { type: Number, default: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "profile" },
});
module.exports = Service = mongoose.model("service", serviceSchema);
