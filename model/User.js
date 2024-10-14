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
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;