const SellerModel = require("../models/SellerModel")

const addSeller = async (req, res) => {
    try {
        const newSeller = await SellerModel.create(req.body)
        res.status(201).json({ message: "seller added", data: newSeller })
    } catch (err) {
        res.status(500).json({ message: "Error adding seller", err: err.message })
    }
}

const getAllsellers = async (req, res) => {
    try {
        const sellers = await SellerModel.find()
        res.status(200).json({ message: "sellers fetched", data: sellers })
    } catch (err) {
        res.status(500).json({ message: "error fetching sellers", err: err.message })
    }
}

const getSellerById = async (req, res) => {
    try {
        const seller = await SellerModel.findById(req.params.id)
        res.status(200).json({ data: seller })
    } catch (err) {
        res.status(500).json({ message: "error fetching seller", err: err.message })
    }
}

const updateSeller = async (req, res) => {
    try {
        const seller = await SellerModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json({ message: "seller updated", data: seller })
    } catch (err) {
        res.status(500).json({ message: "Error updating seller", err: err.message })
    }
}

const deleteSeller = async (req, res) => {
    try {
        const seller = await SellerModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "seller deleted", data: seller })
    } catch (err) {
        res.status(500).json({ message: "Error deleting seller", err: err.message })
    }
}

module.exports = {
    addSeller,
    getAllsellers,
    getSellerById,
    updateSeller,
    deleteSeller
}