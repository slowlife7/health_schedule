const mongoose = require("mongoose");

const excerciseSchema = new mongoose.Schema({
  userid: String,
  name: { type: String, lowercase: true, trim: true },
  set: { type: Number, min: 1, max: 10 },
  weight: Number,
  pick: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("excercise", excerciseSchema);
