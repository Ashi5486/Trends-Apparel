const Section = require('../models/section_models'); // Ensure correct path to your model
const asyncHandler = require('../utils/asyncHandler'); 
const customError = require('../utils/customError'); 

// Create a section
const createSection = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new customError('Section name is required', 400);
  }

  const section = await Section.create({ name });
  res.status(201).json({ success: true, section });
});

// Get all sections with pagination and search
const getAllSections = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  const query = {
    name: { $regex: search, $options: 'i' },
  };

  const total = await Section.countDocuments(query);
  const sections = await Section.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(200).json({ success: true, total, sections });
});

// Update section
const updateSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const section = await Section.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  );

  if (!section) {
    throw new customError('Section not found', 404);
  }

  res.status(200).json({ success: true, section });
});

// Delete section
const deleteSection = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const section = await Section.findByIdAndDelete(id);

  if (!section) {
    throw new customError('Section not found', 404);
  }

  res.status(200).json({ success: true, message: 'Section deleted' });
});

// Export functions using module.exports
module.exports = {
  createSection,
  getAllSections,
  updateSection,
  deleteSection,
};
