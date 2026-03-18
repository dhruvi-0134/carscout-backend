const mongoose = require("mongoose")
const Schema = mongoose.Schema
const paymentSchema = new Schema({
    transaction_id: {
        type: mongoose.Types.ObjectId,
        ref: "transactions"
    },
    payment_method: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        defult: "Pending"
    },
    payment_date: {
        type: Date,
        defult: Date.now
    }
})
module.exports = mongoose.model("payments", paymentSchema)