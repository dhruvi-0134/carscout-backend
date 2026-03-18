const Inspection = require("../models/InspectionReportModel")

// Add Inspection
const addInspection = async (req, res) => {
    try {

        const inspection = await Inspection.create(req.body)

        res.status(201).json({
            message: "Inspection added successfully",
            data: inspection
        })

    } catch (err) {

        res.status(500).json({
            message: "Error while adding inspection",
            err
        })

    }
}


// Get All Inspections
const getAllInspections = async (req, res) => {
    try {

        const inspections = await Inspection.find()
            .populate("carId")

        res.status(200).json({
            message: "Inspections fetched successfully",
            data: inspections
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching inspections",
            err
        })

    }
}


// Get Inspection By ID
const getInspectionById = async (req, res) => {
    try {

        const inspection = await Inspection.findById(req.params.id)
            .populate("carId")

        res.status(200).json({
            message: "Inspection fetched successfully",
            data: inspection
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching inspection",
            err
        })

    }
}


// Update Inspection
const updateInspection = async (req, res) => {
    try {

        const inspection = await Inspection.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Inspection updated successfully",
            data: inspection
        })

    } catch (err) {

        res.status(500).json({
            message: "Error updating inspection",
            err
        })

    }
}


// Delete Inspection
const deleteInspection = async (req, res) => {
    try {

        const inspection = await Inspection.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Inspection deleted successfully",
            data: inspection
        })

    } catch (err) {

        res.status(500).json({
            message: "Error deleting inspection",
            err
        })

    }
}

module.exports = {
    addInspection,
    getAllInspections,
    getInspectionById,
    updateInspection,
    deleteInspection
}