const OfferNegotiation = require("../models/OfferNegotiationModel")

// Add Offer
const addOffer = async (req, res) => {
    try {

        const offer = await OfferNegotiation.create(req.body)

        res.status(201).json({
            message: "Offer created successfully",
            data: offer
        })

    } catch (err) {

        res.status(500).json({
            message: "Error while creating offer",
            err
        })

    }
}


// Get All Offers
const getAllOffers = async (req, res) => {
    try {

        const offers = await OfferNegotiation.find()
            .populate("buyerId")
            .populate("sellerId")
            .populate("carId")

        res.status(200).json({
            message: "Offers fetched successfully",
            data: offers
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching offers",
            err
        })

    }
}


// Get Offer By ID
const getOfferById = async (req, res) => {
    try {

        const offer = await OfferNegotiation.findById(req.params.id)
            .populate("buyerId")
            .populate("sellerId")
            .populate("carId")

        res.status(200).json({
            message: "Offer fetched successfully",
            data: offer
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching offer",
            err
        })

    }
}


// Update Offer
const updateOffer = async (req, res) => {
    try {

        const offer = await OfferNegotiation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Offer updated successfully",
            data: offer
        })

    } catch (err) {

        res.status(500).json({
            message: "Error updating offer",
            err
        })

    }
}


// Delete Offer
const deleteOffer = async (req, res) => {
    try {

        const offer = await OfferNegotiation.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Offer deleted successfully",
            data: offer
        })

    } catch (err) {

        res.status(500).json({
            message: "Error deleting offer",
            err
        })

    }
}

module.exports = {
    addOffer,
    getAllOffers,
    getOfferById,
    updateOffer,
    deleteOffer
}