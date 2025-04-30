const mongoose = require("mongoose");

const tidnoSchema = new mongoose.Schema(
  {
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
