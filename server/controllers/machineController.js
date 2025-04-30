const Machine = require("../models/machinemodels")

const createMachine = async (req, res) => {
    try {
        const machine = new Machine(req.body);
        await machine.save();
        res.status(201).json(machine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all Machines
const getAllMachines = async (req, res) => {
    try {
        const machines = await Machine.find();
        res.status(200).json(machines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a single Machine by ID
const getMachineById = async (req, res) => {
    try {
        const machine = await Machine.findById(req.params.id);
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.status(200).json(machine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Machine by ID
const updateMachine = async (req, res) => {
    try {
        const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.status(200).json(machine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Machine by ID
const deleteMachine = async (req, res) => {
    try {
        const machine = await Machine.findByIdAndDelete(req.params.id);
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.status(200).json({ message: 'Machine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine
};