const mongoose = require("mongoose")
const Schema = mongoose.Schema
const sellerSchema = new Schema({
    seller_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    seller_type: {
        type: String,
        required: true
    },
    company_name: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    account_status: {
        type: String,
        enum: ["active", "suspended"],
        default: "active"
    }
}, { timestamps: true })
module.exports = mongoose.model("sellers", sellerSchema)