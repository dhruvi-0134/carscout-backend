const mongoose = require("mongoose")
const Schema = mongoose.Schema
const feedbackSchema = new Schema({
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
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    feedback_date: {
        type: Date,
        defult: Date.now
    }
})
module.exports = mongoose.model("feedbacks", feedbackSchema)