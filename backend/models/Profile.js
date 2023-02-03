const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  profileImg: String,
  city: String,
  adress: String,
  phoneNumber: Number,
  birthday: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = Profile = mongoose.model("profile", profileSchema);
