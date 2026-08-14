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
  { timestamps: true }, // Adds createdAt and updatedAt fields automatically
);

// Index to ensure each home is added to favorites only once per user
// If userId is added, change this to: { userId: 1, homeId: 1 }
favouriteSchema.index({ homeId: 1 }, { unique: true });

module.exports = mongoose.model("Favourite", favouriteSchema);
