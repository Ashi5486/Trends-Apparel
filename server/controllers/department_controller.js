
const Department = require("../models/department_models.js");

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
    return res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
      error: error.message,
    });
  }
};

const createDepartment = async (req, res) => {
  const { userId, departmentName, status } = req.body;
  try {
    const newDepartment = await Department.create({
      user: userId,
      departmentName,
      status,
    });
    return res.status(200).json({
      success: true,
      message: "Department created successfully",
      data: newDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { departmentName, status } = req.body;
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { departmentName, status },
      { new: true, runValidators: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: updatedDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
      data: deletedDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};