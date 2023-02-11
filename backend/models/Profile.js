const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  profileImg: String,
  city: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  birthday: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = Profile = mongoose.model("profile", profileSchema);
