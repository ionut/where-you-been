const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  cityName: {
    required: true,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
  emoji: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  notes: {
    required: true,
    type: String,
  },
  position: {
    lat: {
      required: true,
      type: Number,
    },
    lng: {
      required: true,
      type: Number,
    },
  },
});

module.exports = mongoose.model("Data", dataSchema);
