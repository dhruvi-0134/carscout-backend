const Transaction = require("../models/TransactionModel")

// Add Transaction
const addTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.create(req.body)

        res.status(201).json({
            message: "Transaction created successfully",
            data: transaction
        })

    } catch (err) {

        res.status(500).json({
            message: "Error while creating transaction",
            err
        })

    }
}


// Get All Transactions
const getAllTransactions = async (req, res) => {
    try {

        const transactions = await Transaction.find()
            .populate("buyerId")
            .populate("sellerId")
            .populate("carId")

        res.status(200).json({
            message: "Transactions fetched successfully",
            data: transactions
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching transactions",
            err
        })

    }
}


// Get Transaction By ID
const getTransactionById = async (req, res) => {
    try {

        const transaction = await Transaction.findById(req.params.id)
            .populate("buyerId")
            .populate("sellerId")
            .populate("carId")

        res.status(200).json({
            message: "Transaction fetched successfully",
            data: transaction
        })

    } catch (err) {

        res.status(500).json({
            message: "Error fetching transaction",
            err
        })

    }
}


// Update Transaction
const updateTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Transaction updated successfully",
            data: transaction
        })

    } catch (err) {

        res.status(500).json({
            message: "Error updating transaction",
            err
        })

    }
}


// Delete Transaction
const deleteTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Transaction deleted successfully",
            data: transaction
        })

    } catch (err) {

        res.status(500).json({
            message: "Error deleting transaction",
            err
        })

    }
}

module.exports = {
    addTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
}