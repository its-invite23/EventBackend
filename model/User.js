const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    OTP: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    country_code: {
        type: String,
    },
    phone_code: {
        type: String,
    },
    DOB: {
        type: String,
    },
    state: {
        type: String,
    },
    phone_number: {
        type: Number,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    enquiry_count: {
        type: Number
    },
    user_status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    verified: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model("User", userSchema);

module.exports = User;