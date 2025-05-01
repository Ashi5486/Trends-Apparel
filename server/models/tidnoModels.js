const mongoose = require("mongoose");

const tidnoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "User ID is required"],
    },
    TidnoName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Tidno = mongoose.model("Tidno", tidnoSchema);
module.exports = Tidno;
