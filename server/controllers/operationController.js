const { Operation } = require("../models/operationmodels"); // Adjust path as needed
const mongoose = require("mongoose");

// Create a new Operation
const createOperation = async (req, res) => {
    try {
        const {
            operationName,
            description,
            rate,
            unitType,
            department,
            style,
            garment,
            sam,
        } = req.body;

        const newOperation = new Operation({
            userId: req.userId, // Assuming you're using JWT to authenticate users
            operationName,
            description,
            rate,
            unitType,
            department,
            style,
            garment,
            sam,
        });

        const savedOperation = await newOperation.save();
        return res.status(201).json(savedOperation);
    } catch (error) {
        console.error("Error creating operation:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get all Operations
const getOperations = async (req, res) => {
    try {
        const operations = await Operation.find()
            .populate("unitType", "name") // Populate the unitType field (optional)
            .populate("department", "DepartmentName") // Populate the department field (optional)
            .populate("style", "styleName") // Populate the style field (optional)
            .populate("garment", "garmentName"); // Populate the garment field (optional)

        return res.status(200).json(operations);
    } catch (error) {
        console.error("Error fetching operations:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get a single Operation by ID
const getOperationById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Operation ID" });
    }

    try {
        const operation = await Operation.findById(id)
            .populate("unitType")
            .populate("department")
            .populate("style")
            .populate("garment");

        if (!operation) {
            return res.status(404).json({ message: "Operation not found" });
        }

        return res.status(200).json(operation);
    } catch (error) {
        console.error("Error fetching operation:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Update an existing Operation
const updateOperation = async (req, res) => {
    const { id } = req.params;
    const { operationName, description, rate, unitType, department, style, garment, sam } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Operation ID" });
    }

    try {
        const updatedOperation = await Operation.findByIdAndUpdate(
            id,
            {
                operationName,
                description,
                rate,
                unitType,
                department,
                style,
                garment,
                sam,
            },
            { new: true }
        );

        if (!updatedOperation) {
            return res.status(404).json({ message: "Operation not found" });
        }

        return res.status(200).json(updatedOperation);
    } catch (error) {
        console.error("Error updating operation:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Delete an Operation
const deleteOperation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Operation ID" });
    }

    try {
        const deletedOperation = await Operation.findByIdAndDelete(id);

        if (!deletedOperation) {
            return res.status(404).json({ message: "Operation not found" });
        }

        return res.status(200).json({ message: "Operation deleted successfully" });
    } catch (error) {
        console.error("Error deleting operation:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createOperation,
    getOperations,
    getOperationById,
    updateOperation,
    deleteOperation,
};
