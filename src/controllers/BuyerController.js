const Buyer = require("../models/BuyerModel")

const addBuyer = async (req, res) => {
    try {
        const buyer = await Buyer.create(req.body)
        res.status(201).json({ message: "Buyer added", data: buyer })
    } catch (err) {
        res.status(500).json({ message: "error adding buyer", err })
    }
}
const getAllbuyers = async (req, res) => {
    try {
        const buyer = await Buyer.find()
        res.status(200).json({ message: "Buyer fetched", data: buyer })
    } catch (err) {
        res.status(500).json({ message: "Error fetching buyers", err })
    }
}
const getBuyerById = async (req, res) => {
    try {
        const buyer = await Buyer.findById(req.params.id)
        res.status(200).json({ data: buyer })
    } catch (err) {
        res.status(500).json({ message: "Error fetching buyer", err })
    }
}
const updateBuyer = async (req, res) => {
    try {
        const buyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ message: "Buyer updated", data: buyer })
    } catch (err) {
        res.status(500).json({ message: "Error updating buyer", err })
    }
}
const deleteBuyer = async (req, res) => {
    try {
        const buyer = await Buyer.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Buyer deleted", data: buyer })
    } catch (err) {
        res.status(500).json({ message: "Error deleting buyer", err })
    }
}
module.exports = {
    addBuyer,
    getAllbuyers,
    getBuyerById,
    updateBuyer,
    deleteBuyer
}