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
        set: function (value) {
            if (typeof value === 'string') {
                const parts = value.split("-");
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1; 
                const year = parseInt(parts[2], 10);
                return new Date(year, month, day);
            }
            return value;
        },
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
    created_date: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
