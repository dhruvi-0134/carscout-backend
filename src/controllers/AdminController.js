const Admin = require("../models/AdminModel")
const addAdmin = async (req, res) => {
    try {
        const admin = await Admin.create(req.body)
        res.status(201).json({ message: "Admin added", data: admin })
    } catch (err) {
        res.status(500).json({ message: "Error adding admin", err })
    }
}
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find()
        res.status(200).json({ message: "Admin fetched", data: admins })
    } catch (err) {
        res.status(500).json({ message: "error fetching admins", err })
    }
}
const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)
        res.status(200).json({ data: admin })
    } catch (err) {
        res.status(500).json({ message: "Error fetching admin", err })
    }
}
const UpadateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ message: "Admin updated", data: admin })
    } catch (err) {
        res.status(500).json({ message: "Error updating admin", err })
    }
}
const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Admin deleted", data: admin })
    } catch (err) {
        res.status(500).json({ message: "Error deleting admin", err })
    }
}
module.exports = {
    addAdmin,
    getAllAdmins,
    getAdminById,
    UpadateAdmin,
    deleteAdmin
}