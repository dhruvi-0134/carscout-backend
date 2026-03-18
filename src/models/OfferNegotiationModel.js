const mongoose = require("mongoose")
const Schema = mongoose.Schema
const offerSchema = new Schema({
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
    offered_price: {
        type: Number,
        required: true
    },
    offer_status: {
        type: String,
        default: "Pending"
    },
    offer_date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("offers", offerSchema)