const mongoose = require("mongoose"); // import mongoose

//_id is automatically created by MongoDB, so we don't need to define it in the schema
const homeSchema = mongoose.Schema(
  {
    homeName: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }, // Automatically adds createdAt and updatedAt
);

// Pre-hook: Delete all related favorites when a home is deleted
homeSchema.pre("findOneAndDelete", async function (next) {
  try {
    const homeId = this.getQuery()["_id"];
    const Favourite = require("./favourite");

    const deletedFavourites = await Favourite.deleteMany({ homeId: homeId });
    console.log(
      `✅ Cascade delete: Removed ${deletedFavourites.deletedCount} favourite(s) for home ${homeId}`,
    );
    next();
  } catch (error) {
    console.error("❌ Error in cascade delete hook:", error.message);
    next(error);
  }
});

module.exports = mongoose.model("Home", homeSchema);
