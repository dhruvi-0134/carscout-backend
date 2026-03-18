const MediaGallery = require("../models/MediaGalleryModel")

// Add Media
const addMedia = async (req, res) => {
    try {

        const media = await MediaGallery.create(req.body)

        res.status(201).json({
            message: "Media added successfully",
            data: media
        })

    } catch (err) {

        res.status(500).json({
            message: "Error while adding media",
            err
        })

    }
}


// Get All Media
const getAllMedia = async (req, res) => {
    try {

        const mediaList = await MediaGallery.find()
            .populate("carId")

        res.status(200).json({
            message: "Media fetched successfully",
            data: mediaList
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching media",
            err
        })

    }
}


// Get Media By ID
const getMediaById = async (req, res) => {
    try {

        const media = await MediaGallery.findById(req.params.id)
            .populate("carId")

        res.status(200).json({
            message: "Media fetched successfully",
            data: media
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching media",
            err
        })

    }
}


// Update Media
const updateMedia = async (req, res) => {
    try {

        const media = await MediaGallery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Media updated successfully",
            data: media
        })

    } catch (err) {

        res.status(500).json({
            message: "Error updating media",
            err
        })

    }
}


// Delete Media
const deleteMedia = async (req, res) => {
    try {

        const media = await MediaGallery.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Media deleted successfully",
            data: media
        })

    } catch (err) {

        res.status(500).json({
            message: "Error deleting media",
            err
        })

    }
}

module.exports = {
    addMedia,
    getAllMedia,
    getMediaById,
    updateMedia,
    deleteMedia
}