// controllers/sizeController.js
const Size = require('../models/tidnoModels')

// Create a new size
const createSize = async (req, res) => {
  const { sizeName, status } = req.body;

  try {
    const newSize = new Size({
      sizeName,
      status
    });

    const savedSize = await newSize.save();
    res.status(201).json({ message: 'Size created successfully', size: savedSize });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create size', error: err.message });
  }
};

// Get all sizes
const getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.find();
    res.status(200).json({ sizeData: sizes });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve sizes', error: err.message });
  }
};

// Get size by ID
const getSizeById = async (req, res) => {
  const { id } = req.params;

  try {
    const size = await Size.findById(id);
    if (!size) {
      return res.status(404).json({ message: 'Size not found' });
    }
    res.status(200).json(size);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve size', error: err.message });
  }
};

// Update size by ID
const updateSize = async (req, res) => {
  const { id } = req.params;
  const { sizeName, status } = req.body;

  try {
    const updatedSize = await Size.findByIdAndUpdate(
      id,
      { sizeName, status },
      { new: true }
    );

    if (!updatedSize) {
      return res.status(404).json({ message: 'Size not found' });
    }

    res.status(200).json({ message: 'Size updated successfully', size: updatedSize });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update size', error: err.message });
  }
};

// Delete size by ID
const deleteSize = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSize = await Size.findByIdAndDelete(id);
    if (!deletedSize) {
      return res.status(404).json({ message: 'Size not found' });
    }

    res.status(200).json({ message: 'Size deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete size', error: err.message });
  }
};

module.exports = {
  createSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize
};
