const Review = require("../models/ReviewModel")

// Add Review
const addReview = async (req, res) => {
    try {

        const review = await Review.create(req.body)

        res.status(201).json({
            message: "Review added successfully",
            data: review
        })

    } catch (err) {

        res.status(500).json({
            message: "Error while adding review",
            err
        })

    }
}


// Get All Reviews
const getAllReviews = async (req, res) => {
    try {

        const reviews = await Review.find()
            .populate("buyerId")
            .populate("sellerId")
            .populate("carId")

        res.status(200).json({
            message: "Reviews fetched successfully",
            data: reviews
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching reviews",
            err
        })

    }
}


// Get Review By ID
const getReviewById = async (req, res) => {
    try {

        const review = await Review.findById(req.params.id)
            .populate("buyerId")
            .populate("sellerId")
            .populate("carId")

        res.status(200).json({
            message: "Review fetched successfully",
            data: review
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching review",
            err
        })

    }
}


// Update Review
const updateReview = async (req, res) => {
    try {

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Review updated successfully",
            data: review
        })

    } catch (err) {

        res.status(500).json({
            message: "Error updating review",
            err
        })

    }
}


// Delete Review
const deleteReview = async (req, res) => {
    try {

        const review = await Review.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Review deleted successfully",
            data: review
        })

    } catch (err) {

        res.status(500).json({
            message: "Error deleting review",
            err
        })

    }
}

module.exports = {
    addReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
}