const mongoose = require("mongoose")
const Schema = mongoose.Schema
const inspectionSchema = new Schema({
    car_id: {
        type: mongoose.Types.ObjectId,
        ref: "cars"
    },
    inspection_score: {
        type: Number,
        required: true
    },
    accident_history: {
        type: String
    },
    service_history: {
        type: String
    },
    inspection_date: {
        type: Date,
        default: Date.now
    },
    inspector_name: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("inspectionreports", inspectionSchema)