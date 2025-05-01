const Style = require('../models/stylemodels');

// Create Style
const createStyle = async (req, res) => {
  try {
    const style = await Style.create(req.body);
    res.status(201).json(style);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Styles
const getAllStyles = async (req, res) => {
  try {
    const styles = await Style.find().populate('Tidno').populate('userId');
    res.status(200).json(styles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Style
const updateStyle = async (req, res) => {
  try {
    const updatedStyle = await Style.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedStyle) return res.status(404).json({ message: 'Style not found' });
    res.status(200).json(updatedStyle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Style
const deleteStyle = async (req, res) => {
  try {
    const deletedStyle = await Style.findByIdAndDelete(req.params.id);
    if (!deletedStyle) return res.status(404).json({ message: 'Style not found' });
    res.status(200).json({ message: 'Style deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStyle,
  getAllStyles,
  updateStyle,
  deleteStyle
};
