const Tidno = require("../models/tidnoModels");

// GET all TID NOs
const getTidnos = async (req, res) => {
  try {
    const tidnos = await Tidno.find(); // No userId filtering
    res.status(200).json({ success: true, data: tidnos });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tidnos",
      error: error.message,
    });
  }
};

// POST create TID NO
const createTidno = async (req, res) => {
  const { TidnoName, status } = req.body;
  try {
    const newTidno = await Tidno.create({ TidnoName, status });
    res.status(200).json({
      success: true,
      message: "Tidno created successfully",
      data: newTidno,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create tidno",
      error: error.message,
    });
  }
};

// PUT update TID NO
const updateTidno = async (req, res) => {
  const { id } = req.params;
  const { TidnoName, status } = req.body;
  try {
    const updatedTidno = await Tidno.findByIdAndUpdate(
      id,
      { TidnoName, status },
      { new: true, runValidators: true }
    );
    if (!updatedTidno) {
      return res.status(404).json({
        success: false,
        message: "Tidno not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Tidno updated successfully",
      data: updatedTidno,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update tidno",
      error: error.message,
    });
  }
};

// DELETE TID NO
const deleteTidno = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTidno = await Tidno.findByIdAndDelete(id);
    if (!deletedTidno) {
      return res.status(404).json({
        success: false,
        message: "Tidno not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Tidno deleted successfully",
      data: deletedTidno,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete tidno",
      error: error.message,
    });
  }
};

module.exports = {
  getTidnos,
  createTidno,
  updateTidno,
  deleteTidno,
};
