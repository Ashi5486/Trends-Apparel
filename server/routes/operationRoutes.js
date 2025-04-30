const express = require("express");
const {
    createOperation,
    getOperations,
    getOperationById,
    updateOperation,
    deleteOperation,
} = require("../controllers/operationController"); // Adjust path as needed

const router = express.Router();

// Routes for Operations
router.post("/", createOperation); // Create Operation
router.get("/", getOperations); // Get all Operations
router.get("/:id", getOperationById); // Get Operation by ID
router.patch("/operations/:id", updateOperation); // Update Operation
router.delete("/operations/:id", deleteOperation); // Delete Operation

module.exports = router;
