// const mongoose = require("mongoose");

// const machineIssueSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       // required: [true, 'User ID is required']  // Uncomment if you want to require userId
//     },
//     issueName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     issueCode: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     status: {
//       type: String,
//       enum: ['Active', 'Inactive'],
//       required: [true, 'Status is required']
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("MachineIssue", machineIssueSchema);



const mongoose = require("mongoose");

const machineIssueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming a 'User' model exists
      required: [true, 'User ID is required'],
    },
    issueName: {
      type: String,
      required: [true, 'Issue name is required'],
      trim: true,
    },
    issueCode: {
      type: String,
      required: [true, 'Issue code is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      required: [true, 'Status is required'],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MachineIssue", machineIssueSchema);
