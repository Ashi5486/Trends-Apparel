const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sectionName: {
      type: String,
      required: true,
      trim: true,
    },
    line: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Line',
      required: [true, 'Line reference is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Section', SectionSchema);