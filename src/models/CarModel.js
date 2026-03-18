const mongoose = require("mongoose")
const Schema = mongoose.Schema

const carSchema = new Schema({
    seller_id: {
        type: mongoose.Types.ObjectId,
        ref: "sellers",
        required: true
    },

    make: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    mileage: {
        type: Number,
        required: true
    },

    fuel_type: {
        type: String,
        required: true
    },

    transmission: {
        type: String,
        required: true
    },

    condition: {
        type: String,
        required: true
    },

    color: {
        type: String
    },

    description: {
        type: String
    },

    image: {      // ✅ lowercase
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model("cars", carSchema)