const mongoose = require('mongoose');
const { Schema } = mongoose;

const machineSchema = new Schema({
    
    machineName: {
        type: String,
        required: [true, 'Machine name is required'],
        trim: true,
        unique: true, // <<< ADD THIS
        maxlength: [20, 'Machine name must not have more than 20 characters'],
        minlength: [3, 'Machine name must have at least 3 characters'],
    },
    machineCode: {
        type: String,
        required: [true, 'Machine code is required'],
        trim: true,
        unique: true, // <<< ADD THIS
        maxlength: [20, 'Machine code must not have more than 20 characters'],
        minlength: [3, 'Machine code must have at least 3 characters'],
    },
    machineValue: {
        type: String,
        required: [true, 'Machine value is required'],
        trim: true,
        maxlength: [20, 'Machine value must not have more than 20 characters'],
        minlength: [3, 'Machine value must have at least 3 characters'],
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: [true, 'Status is required'],
    }
}, { timestamps: true });

module.exports = mongoose.model('Machine', machineSchema);
