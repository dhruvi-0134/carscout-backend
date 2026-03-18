const mongoose = require("mongoose")
const Schema = mongoose.Schema
const notificationSchema = new Schema({
    user_type: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId
    },
    message: {
        type: String,
        required: true
    },
    is_read: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        defult: Date.now
    }
})
module.exports = mongoose.model("notifications", notificationSchema)