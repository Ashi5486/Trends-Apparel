const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    // required: [true, 'user id required'],
    },
    ColorName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        // unique: true,
        maxlength: [20, 'Color must not have more than 20 characters'],
        minlength: [3, 'Color must have at least 3 characters'],
        uppercase: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: [true, 'Status is required'],
    },
}, { timestamps: true });

const Color = mongoose.model('Color', colorSchema);
module.exports = { Color };
