const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    homeName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    photo: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Home", homeSchema);
