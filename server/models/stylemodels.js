const mongoose = require('mongoose');
const { Schema } = mongoose;

const styleSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: [true, 'User ID is required'],
    },
    styleName: {
        type: String,
        required: [true, 'Style name is required'],
        trim: true,
        // unique: true,
        maxlength: [20, 'Style must not have more than 20 characters'],
        minlength: [3, 'Style must have at least 3 characters'],
        uppercase: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: [true, 'Status is required'],
    },
    Tidno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TIDNO',
        required: [true, 'Tidno is required'],
    }
}, { timestamps: true });

module.exports = mongoose.model('Style', styleSchema);
