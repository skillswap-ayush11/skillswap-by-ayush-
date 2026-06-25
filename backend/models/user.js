const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  skillsTeach: [String],

  teachSkills: {
    type: [String],
    default: []
  },

  learnSkills: {
    type: [String],
    default: []
  },

  profileImage: String,

  username: String,

  bio: String,

  country: String,
  state: String,
  city: String,

  address: String,

  phone: String,

  github: String,
  linkedin: String,
  portfolio: String,

  languages: [String],

  availability: String,

  rating: {
    type: Number,
    default: 0
  },

  matches: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("User", userSchema);