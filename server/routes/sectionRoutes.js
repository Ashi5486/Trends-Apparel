const express = require('express');
const {
  createSection,
  getAllSections,
  updateSection,
  deleteSection,
} = require('../controllers/sectionController');

const sectionRouter = express.Router();


sectionRouter.post('/', createSection); 
sectionRouter.get('/', getAllSections); 
sectionRouter.patch('/:id', updateSection);
sectionRouter.delete('/:id', deleteSection);  

module.exports = sectionRouter; // Export the sectionRouter
