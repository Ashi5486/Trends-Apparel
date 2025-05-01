const express = require('express');
const styleRouter= express.Router();
const {
  createStyle,
  getAllStyles,
  updateStyle,
  deleteStyle
} = require('../controllers/styleControllers');

// POST - Create a new style
styleRouter.post('/', createStyle);

// GET - Get all styles
styleRouter.get('/', getAllStyles);


// PUT - Update a style by ID
styleRouter.put('/:id', updateStyle);

// DELETE - Delete a style by ID
styleRouter.delete('/:id', deleteStyle);

module.exports = styleRouter;
