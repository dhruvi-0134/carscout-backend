const mongoose = require("mongoose")
const Schema = mongoose.Schema
const transactionSchema = new Schema({
    buyer_id: {
        type: mongoose.Types.ObjectId,
        ref: "buyers"
    },
    seller_id: {
        type: mongoose.Types.ObjectId,
        ref: "sellers"
    },
    car_id: {
        type: mongoose.Types.ObjectId,
        ref: "cars"
    },
    final_price: {
        type: Number,
        required: true
    },
    transaction_status: {
        type: String,
        default: "Pending"
    },
    transaction_date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("transactions", transactionSchema)