const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mediaSchema = new Schema({
    car_id: {
        type: mongoose.Types.ObjectId,
        ref: "cars"
    },
    media_url: {
        type: String,
        required: true
    },
    media_type: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("mediagallery", mediaSchema)