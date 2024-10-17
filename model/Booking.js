// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    PackageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending',
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
