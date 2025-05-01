const express = require('express');
const colorRouter = express.Router();
const {
    getColors,
    createColor,
    updateColor,
    deleteColor
} = require('../controllers/colorControllers');

colorRouter.get('/', getColors);
colorRouter.put('/:id', updateColor);
colorRouter.post('/', createColor);
colorRouter.delete('/:id', deleteColor);

module.exports = colorRouter;
