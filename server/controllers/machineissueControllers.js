// const MachineIssue = require("../models/machineissueModels.js");

// // Get all machine issues
// const getMachineIssues = async (req, res) => {
//   try {
//     const machineIssues = await MachineIssue.find().populate("userId");
//     return res.status(200).json({
//       success: true,
//       data: machineIssues,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch machine issues",
//       error: error.message,
//     });
//   }
// };

// // Create a machine issue
// const createMachineIssue = async (req, res) => {
//   const { userId, issueName, issueCode, status } = req.body;

//   try {
//     const newMachineIssue = await MachineIssue.create({
//       userId,  // Use correct field name (userId)
//       issueName,  // Use correct field name (issueName)
//       issueCode,  // Use correct field name (issueCode)
//       status,  // Use correct field name (status)
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Machine issue created successfully",
//       data: newMachineIssue,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create machine issue",
//       error: error.message,
//     });
//   }
// };

// // Update a machine issue
// const updateMachineIssue = async (req, res) => {
//   const { id } = req.params;
//   const { issueName, issueCode, status } = req.body;

//   try {
//     const updatedMachineIssue = await MachineIssue.findByIdAndUpdate(
//       id,
//       { issueName, issueCode, status },
//       { new: true, runValidators: true }
//     );

//     if (!updatedMachineIssue) {
//       return res.status(404).json({ success: false, message: "Machine issue not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Machine issue updated successfully",
//       data: updatedMachineIssue,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update machine issue",
//       error: error.message,
//     });
//   }
// };

// // Delete a machine issue
// const deleteMachineIssue = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedMachineIssue = await MachineIssue.findByIdAndDelete(id);

//     if (!deletedMachineIssue) {
//       return res.status(404).json({ success: false, message: "Machine issue not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Machine issue deleted successfully",
//       data: deletedMachineIssue,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete machine issue",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   getMachineIssues,
//   createMachineIssue,
//   updateMachineIssue,
//   deleteMachineIssue,
// };


const MachineIssue = require("../models/machineissueModels.js");

// Get all machine issues
const getMachineIssues = async (req, res) => {
  try {
    const machineIssues = await MachineIssue.find().populate("userId");
    return res.status(200).json({
      success: true,
      data: machineIssues,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch machine issues",
      error: error.message,
    });
  }
};

// Create a machine issue
const createMachineIssue = async (req, res) => {
  const { userId, issueName, issueCode, status } = req.body;

  if (!userId || !issueName || !issueCode || !status) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    const newMachineIssue = await MachineIssue.create({
      userId,
      issueName,
      issueCode,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Machine issue created successfully",
      data: newMachineIssue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create machine issue",
      error: error.message,
    });
  }
};

// Update a machine issue
const updateMachineIssue = async (req, res) => {
  const { id } = req.params;
  const { issueName, issueCode, status } = req.body;

  if (!issueName && !issueCode && !status) {
    return res.status(400).json({
      success: false,
      message: "No fields to update provided",
    });
  }

  try {
    const updatedMachineIssue = await MachineIssue.findByIdAndUpdate(
      id,
      { issueName, issueCode, status },
      { new: true, runValidators: true }
    );

    if (!updatedMachineIssue) {
      return res.status(404).json({ success: false, message: "Machine issue not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Machine issue updated successfully",
      data: updatedMachineIssue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update machine issue",
      error: error.message,
    });
  }
};

// Delete a machine issue
const deleteMachineIssue = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMachineIssue = await MachineIssue.findByIdAndDelete(id);

    if (!deletedMachineIssue) {
      return res.status(404).json({ success: false, message: "Machine issue not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Machine issue deleted successfully",
      data: deletedMachineIssue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete machine issue",
      error: error.message,
    });
  }
};

module.exports = {
  getMachineIssues,
  createMachineIssue,
  updateMachineIssue,
  deleteMachineIssue,
};
