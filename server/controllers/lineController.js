// const Line = require('../models/linemodels');
// const customError = require("../utils/customError.js");
// // @desc    Get all lines
// // @route   GET /api/lines
// const getLines = async (req, res) => {
//   try {
//     const lines = await Line.find();
//     return res.status(200).json({
//       success: true,
//       message: 'Lines fetched successfully',
//       data: lines,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };

// // @desc    Create a new line
// // @route   POST /api/lines
// const createLine = async (req, res) => {
//   const { userId, lineName } = req.body;

//   if (userId || !lineName) {
//     return res.status(400).json({
//       success: false,
//       message: 'All fields are required',
//     });
//   }
//   console.log(userId)

//   try {
//     const newLine = await Line.create({ userId, lineName });
//     return res.status(201).json({
//       success: true,
//       message: 'Line created successfully',
//       data: newLine,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };

// // @desc    Update a line by ID
// // @route   PATCH /api/lines/:id
// const updateLine = async (req, res) => {
//   const { userId, lineName } = req.body;

//   if (!userId || !lineName) {
//     return res.status(400).json({
//       success: false,
//       message: 'All fields are required',
//     });
//   }

//   try {
//     const updatedLine = await Line.findByIdAndUpdate(
//       req.params.id,
//       { userId, lineName },
//       { new: true, runValidators: true }
//     );

//     if (!updatedLine) {
//       return res.status(404).json({
//         success: false,
//         message: 'Line not found',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'Line updated successfully',
//       data: updatedLine,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };

// // @desc    Delete a line by ID
// // @route   DELETE /api/lines/:id
// const deleteLine = async (req, res) => {
//   try {
//     const deletedLine = await Line.findByIdAndDelete(req.params.id);

//     if (!deletedLine) {
//       return res.status(404).json({
//         success: false,
//         message: 'Line not found',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'Line deleted successfully',
//       data: deletedLine,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   getLines,
//   createLine,
//   updateLine,
//   deleteLine,
// };


const Line = require('../models/linemodels');

// @desc    Get all lines
// @route   GET /api/lines
const getLines = async (req, res) => {
  try {
    const lines = await Line.find();
    return res.status(200).json({
      success: true,
      message: 'Lines fetched successfully',
      data: lines,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// @desc    Create a new line
// @route   POST /api/lines
const createLine = async (req, res) => {
  const { userId, lineName } = req.body;

  if (!userId || !lineName) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    const newLine = await Line.create({ userId, lineName });
    return res.status(201).json({
      success: true,
      message: 'Line created successfully',
      data: newLine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// @desc    Update a line by ID
// @route   PATCH /api/lines/:id
const updateLine = async (req, res) => {
  const { lineName } = req.body;

  if (!lineName) {
    return res.status(400).json({
      success: false,
      message: 'Line name is required',
    });
  }

  try {
    const updatedLine = await Line.findByIdAndUpdate(
      req.params.id,
      { lineName },
      { new: true, runValidators: true }
    );

    if (!updatedLine) {
      return res.status(404).json({
        success: false,
        message: 'Line not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Line updated successfully',
      data: updatedLine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// @desc    Delete a line by ID
// @route   DELETE /api/lines/:id
const deleteLine = async (req, res) => {
  try {
    const deletedLine = await Line.findByIdAndDelete(req.params.id);

    if (!deletedLine) {
      return res.status(404).json({
        success: false,
        message: 'Line not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Line deleted successfully',
      data: deletedLine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  getLines,
  createLine,
  updateLine,
  deleteLine,
};
