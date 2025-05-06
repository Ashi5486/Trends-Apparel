// const { Color } = require('../models/colormodel');

// // Create a new color
// const createColor = async (req, res) => {
//     try {
//         const color = new Color({ ...req.body, userId: req.user._id });
//         const savedColor = await color.save();
//         res.status(201).json(savedColor);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // Get all colors
// const getColors = async (req, res) => {
//     try {
//         const colors = await Color.find({ userId: req.user._id });
//         res.status(200).json(colors);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };



// // Update a color
// const updateColor = async (req, res) => {
//     try {
//         const updatedColor = await Color.findOneAndUpdate(
//             { _id: req.params.id, userId: req.user._id },
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedColor) return res.status(404).json({ error: 'Color not found' });
//         res.status(200).json(updatedColor);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // Delete a color
// const deleteColor = async (req, res) => {
//     try {
//         const deletedColor = await Color.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
//         if (!deletedColor) return res.status(404).json({ error: 'Color not found' });
//         res.status(200).json({ message: 'Color deleted successfully' });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// module.exports = {
//     getColors,
//     createColor,
//     updateColor,
//     deleteColor,
// };


const { Color } = require('../models/colormodel');

// Create a new color
const createColor = async (req, res) => {
    try {
        const color = new Color(req.body);
        const savedColor = await color.save();
        res.status(201).json(savedColor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all colors
const getColors = async (req, res) => {
    try {
        const colors = await Color.find().sort({ createdAt: -1 });
        res.status(200).json(colors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a color
const updateColor = async (req, res) => {
    try {
        const updatedColor = await Color.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedColor) return res.status(404).json({ error: 'Color not found' });
        res.status(200).json(updatedColor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a color
const deleteColor = async (req, res) => {
    try {
        const deletedColor = await Color.findByIdAndDelete(req.params.id);
        if (!deletedColor) return res.status(404).json({ error: 'Color not found' });
        res.status(200).json({ message: 'Color deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createColor,
    getColors,
    updateColor,
    deleteColor
};
