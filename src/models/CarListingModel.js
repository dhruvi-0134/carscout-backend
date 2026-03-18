const mongoose = require("mongoose")
const Schema = mongoose.Schema
const listingSchema = new Schema({
    car_id: {
        type: mongoose.Types.ObjectId,
        ref: "cars",
        required: true
    },
    seller_id: {
        type: mongoose.Types.ObjectId,
        ref: "sellers",
        required: true
    },
    listing_status: {
        type: String,
        default: "Active"
    },
    posted_date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("carlisting", listingSchema)