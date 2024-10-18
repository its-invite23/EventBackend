const mongoose = require("mongoose")


const contactSchema  = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const  Contact = mongoose.model("Contact", contactSchema)
module.exports = Contact;