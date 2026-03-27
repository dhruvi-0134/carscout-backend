const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    fullName: {
        type: String
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
    role: {
        type: String,
        default: "buyer",
        enum: ["buyer", "admin", "seller"]
    },
    profilepicture: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "deleted", "blocked"]
    }
})
module.exports = mongoose.model("users", userSchema)