const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "User Id is required"], // ✅ Required again
    },
    lineName: {
      type: String,
      required: [true, 'lineName is required'],
      maxlength: [50, 'lineName must be less than 50 characters'],
      minlength: [3, 'lineName must be more than 3 characters'],
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Line', lineSchema);
