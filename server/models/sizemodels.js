const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  sizeName: {
    type: String,
    required: [true, 'Size Name is required'],
    unique: true,
    trim: true,
    maxlength: [5, 'Size name must not exceed 5 characters'],
    minlength: [2, 'Size name must be at least 2 characters'],
    uppercase: true
  },
}, 
{ timestamps: true });

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
