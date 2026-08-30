const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: [true, "First name is required"],
  },
  LastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  userType: {
    type: String,
    enum: ["host", "guest"],
    default: "guest",
  },
  favouriteHomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
