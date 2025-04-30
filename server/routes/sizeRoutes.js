// routes/sizeRoutes.js
const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/sizeController');



// Get all sizes
router.get('/', sizeController.getAllSizes);

// Create a new size
router.post('/', sizeController.createSize);

// Get size by ID
router.get('/api/sizes/:id', sizeController.getSizeById);


// Update size by ID
router.patch('/api/sizes/:id', sizeController.updateSize);

// Delete size by ID
router.delete('/api/sizes/:id', sizeController.deleteSize);

module.exports = router;
