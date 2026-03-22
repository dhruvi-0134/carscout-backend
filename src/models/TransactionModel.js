const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true });

// ✅ CORRECT WAY (fixes BOTH errors)
const Transaction = mongoose.models.transactions || mongoose.model("transactions", transactionSchema);

module.exports = Transaction;