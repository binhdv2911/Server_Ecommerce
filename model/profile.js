const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fullname: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  age: {
    type: Number,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
