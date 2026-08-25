const mongoose = require("mongoose");

// Favourite Schema - stores user's favorite homes
const favouriteSchema = mongoose.Schema(
  {
    homeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
      required: [true, "Home ID is required"],
    },

    // userId can be added later for multi-user support
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

// Prevent the same home from being added to favourites multiple times
favouriteSchema.index({ homeId: 1 }, { unique: true });

module.exports = mongoose.model("Favourite", favouriteSchema);
