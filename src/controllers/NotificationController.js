const Notification = require("../models/NotificationModel")

// Add Notification
const addNotification = async (req, res) => {
    try {

        const notification = await Notification.create(req.body)

        res.status(201).json({
            message: "Notification added successfully",
            data: notification
        })

    } catch (err) {

        res.status(500).json({
            message: "Error while adding notification",
            err
        })

    }
}


// Get All Notifications
const getAllNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find()
            .populate("userId")

        res.status(200).json({
            message: "Notifications fetched successfully",
            data: notifications
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching notifications",
            err
        })

    }
}


// Get Notification By ID
const getNotificationById = async (req, res) => {
    try {

        const notification = await Notification.findById(req.params.id)
            .populate("userId")

        res.status(200).json({
            message: "Notification fetched successfully",
            data: notification
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching notification",
            err
        })

    }
}


// Update Notification
const updateNotification = async (req, res) => {
    try {

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Notification updated successfully",
            data: notification
        })

    } catch (err) {

        res.status(500).json({
            message: "Error updating notification",
            err
        })

    }
}


// Delete Notification
const deleteNotification = async (req, res) => {
    try {

        const notification = await Notification.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Notification deleted successfully",
            data: notification
        })

    } catch (err) {

        res.status(500).json({
            message: "Error deleting notification",
            err
        })

    }
}

module.exports = {
    addNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification
}