const Booking = require("../model/Booking");


const catchAsync = require("../utils/catchAsync");


exports.bookingpost = catchAsync(async (req, res) => {
    const userId = req?.User?._id;
    if (!userId) {
        return res.status(400).json({
            status: false,
            message: "User information not found in the request or userId is undefined.",
        });
    }

    const { Package,package_name, bookingDate, location, status, attendees, totalPrice } = req.body;

    try {
        const record = new Booking({
            package:Package,
            package_name,
            bookingDate,
            location,
            status,
            userId,
            attendees,
            totalPrice
        });

        await record.save();

        return res.status(201).json({
            status: true,
            message: "Booking successfully created!",
            data: record,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while creating the booking.",
            error: error.message,
        });
    }
});




exports.BookingGet = catchAsync(async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalBooking = await Booking.countDocuments();
        const BookingData = await Booking.find({}).sort({ created_at: -1 })
            .skip(skip)
            .limit(limit).populate({
                path: 'userId',
                select: "username email"
                //  model: 'User'
            });;
        const totalPages = Math.ceil(totalBooking / limit);
        res.status(200).json({
            data: {
                bookingdata: BookingData,
                totalBooking: totalBooking,
                totalPages: totalPages,
                currentPage: page,
                perPage: limit,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            },
            msg: "Contact Get",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Failed to fetch Contact get",
            error: error.message,
        });
    }
});