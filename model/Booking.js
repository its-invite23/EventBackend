const mongoose = require('mongoose');

const bookingSchema =  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    package: {
      type:Array,
    },
    package_name :String,
    bookingDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    payment_genrator_link: {
        type: Boolean,
        deafult: false,
    },
    status: {
        type: String,
        enum: ['pending', 'approve', 'reject'],
        default: 'pending',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    attendees :Number,
    totalPrice :Number,
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
