const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    package: {
        type: Array,
    },
    package_name: String,
    CurrencyCode :String,
    bookingDate: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    payment_genrator_link: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    attendees: Number,
    totalPrice: Number,
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
