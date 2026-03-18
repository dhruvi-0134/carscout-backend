const TestDrive = require("../models/TestDriveModel")

// Add Test Drive
const addTestDrive = async (req, res) => {
    try {

        const testDrive = await TestDrive.create(req.body)

        res.status(201).json({
            message: "Test drive booked successfully",
            data: testDrive
        })

    } catch (err) {

        res.status(500).json({
            message: "Error while booking test drive",
            err
        })

    }
}


// Get All Test Drives
const getAllTestDrives = async (req, res) => {
    try {

        const testDrives = await TestDrive.find()
            .populate("buyerId")
            .populate("carId")

        res.status(200).json({
            message: "Test drives fetched successfully",
            data: testDrives
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching test drives",
            err
        })

    }
}


// Get Test Drive By ID
const getTestDriveById = async (req, res) => {
    try {

        const testDrive = await TestDrive.findById(req.params.id)
            .populate("buyerId")
            .populate("carId")

        res.status(200).json({
            message: "Test drive fetched successfully",
            data: testDrive
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching test drive",
            err
        })

    }
}


// Update Test Drive
const updateTestDrive = async (req, res) => {
    try {

        const testDrive = await TestDrive.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Test drive updated successfully",
            data: testDrive
        })

    } catch (err) {

        res.status(500).json({
            message: "Error updating test drive",
            err
        })

    }
}


// Delete Test Drive
const deleteTestDrive = async (req, res) => {
    try {

        const testDrive = await TestDrive.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Test drive deleted successfully",
            data: testDrive
        })

    } catch (err) {

        res.status(500).json({
            message: "Error deleting test drive",
            err
        })

    }
}

module.exports = {
    addTestDrive,
    getAllTestDrives,
    getTestDriveById,
    updateTestDrive,
    deleteTestDrive
}