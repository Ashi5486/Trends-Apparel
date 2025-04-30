

// const mongoose = require('mongoose');

// const departmentSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     // required: [true, 'User ID is required']
//   },
//   DepartmentName: {
//     type: String,
//     required: [true, 'Department Name is required'],
//     trim: true,
//     maxlength: [20, 'Department name must not exceed 20 characters'],
//     minlength: [5, 'Department name must be at least 3 characters'],
//     uppercase: true
//   },
//   status: {
//     type: String,
//     enum: ['Active', 'Inactive'],
//     required: [true, 'Status is required'],
//     default: 'Active'
//   }
// }, { timestamps: true });

// const Department = mongoose.model('Department', departmentSchema);

// module.exports = Department;




const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: [true, 'User ID is required']
    },
    departmentName: {
        type: String,
        required: [true, 'Department Name is required'],
        trim: true,
        maxlength: [20, 'Department name must not exceed 20 characters'],
        minlength: [3, 'Department name must be at least 3 characters'],
        uppercase: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: [true, 'Status is required']
    }
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;