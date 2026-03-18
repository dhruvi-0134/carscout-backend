const mongoose = require("mongoose")
const Schema = mongoose.Schema
const adminSchema = new Schema({
    admin_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    last_login: {
        type: Date
    }
})
module.exports = mongoose.model("admins", adminSchema)