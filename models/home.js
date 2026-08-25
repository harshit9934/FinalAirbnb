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

homeSchema.pre(["findOneAndDelete", "deleteOne"], async function () {
  try {
    const filter = this.getFilter ? this.getFilter() : this.getQuery();
    const homeId = filter && filter._id ? filter._id : null;

    if (!homeId) {
      return;
    }

    const Favourite = mongoose.model("Favourite");
    const deletedFavourites = await Favourite.deleteMany({ homeId });

    console.log(
      `✅ Cascade delete: Removed ${deletedFavourites.deletedCount} favourite(s) for home ${homeId}`,
    );
  } catch (error) {
    console.error("❌ Error in cascade delete hook:", error.message);
    throw error;
  }
});

module.exports = mongoose.model("Home", homeSchema);
