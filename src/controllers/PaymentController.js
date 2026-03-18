const Payment = require("../models/PaymentModel")

// Add Payment
const addPayment = async (req, res) => {
    try {

        const payment = await Payment.create(req.body)

        res.status(201).json({
            message: "Payment added successfully",
            data: payment
        })

    } catch (err) {

        res.status(500).json({
            message: "Error while adding payment",
            err
        })

    }
}


// Get All Payments
const getAllPayments = async (req, res) => {
    try {

        const payments = await Payment.find()
            .populate("transactionId")

        res.status(200).json({
            message: "Payments fetched successfully",
            data: payments
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching payments",
            err
        })

    }
}


// Get Payment By ID
const getPaymentById = async (req, res) => {
    try {

        const payment = await Payment.findById(req.params.id)
            .populate("transactionId")

        res.status(200).json({
            message: "Payment fetched successfully",
            data: payment
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching payment",
            err
        })

    }
}


// Update Payment
const updatePayment = async (req, res) => {
    try {

        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Payment updated successfully",
            data: payment
        })

    } catch (err) {

        res.status(500).json({
            message: "Error updating payment",
            err
        })

    }
}


// Delete Payment
const deletePayment = async (req, res) => {
    try {

        const payment = await Payment.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Payment deleted successfully",
            data: payment
        })

    } catch (err) {

        res.status(500).json({
            message: "Error deleting payment",
            err
        })

    }
}

module.exports = {
    addPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
}