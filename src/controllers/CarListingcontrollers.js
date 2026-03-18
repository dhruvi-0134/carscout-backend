const CarListing = require("../models/CarListingModel")

const addCarListing = async (req, res) => {
    try {
        const carListing = await CarListing.create(req.body)
        res.status(201).json({
            message: "Car listing added  successfully",
            data: carListing
        })
    } catch (err) {
        res.status(500).json({
            message: "Car listing added successfully",
            data: carListing
        })
    }
}
const getAllCarListings = async (req, res) => {
    try {
        const listings = await CarListing.find()
            .populate("seller_id")
            .populate("car_id");

        res.status(200).json({
            message: "Car listing fetched successfully",
            data: listings
        });
    } catch (err) {
        console.log("ERROR 👉", err);
        res.status(500).json({
            message: "Error fetching car listings",
            error: err.message
        });
    }
};
const getCarListingById = async (req, res) => {
    try {
        const listing = await CarListing.findById(req.params, id)
            .populate("seller_id")
            .populate("car_id")
        res.status(200).json({
            message: "Car listing fetched successfully",
            data: listing
        })
    } catch (err) {
        res.status(500).json({
            message: "Error fetching car listing",
            err
        })
    }
}
const updateCarListing = async (req, res) => {
    try {
        const listing = await CarListing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        res.status(200).json({
            message: "Car listing updated successfully",
            data: listing
        })
    } catch (err) {
        res.status(500).json({
            message: "Error updating car listing",
            err
        })
    }
}
const deleteCarListing = async (req, res) => {
    try {
        const listing = await CarListing.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Car listing deleted successfully",
            data: listing
        })
    } catch (err) {
        res.status(500).json({
            message: "Error deleting car listing",
            err
        })
    }
}
module.exports = {
    addCarListing,
    getAllCarListings,
    getCarListingById,
    updateCarListing,
    deleteCarListing
}