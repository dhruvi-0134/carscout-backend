const mongoose = require("mongoose")
const Schema = mongoose.Schema
const testDriveSchema = new Schema({
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
    scheduled_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
})
module.exports = mongoose.model("testdrives", testDriveSchema)