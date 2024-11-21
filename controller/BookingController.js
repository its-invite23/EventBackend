const Booking = require("../model/Booking");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/EmailMailler");
const emailTemplate = require("../emailTemplates/Booking");
const { errorResponse, successResponse } = require("../utils/ErrorHandling");

exports.bookingpost = catchAsync(async (req, res) => {
  const userId = req?.User?._id;
  if (!userId) {
    return res.status(400).json({
      status: false,
      message: "User information not found in the request or userId is undefined.",
    });
  }

  const { Package, package_name, bookingDate, location, status, attendees, totalPrice } = req.body;

  try {
    const record = new Booking({
      package: Package,
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

exports.BookingStatus = catchAsync(async (req, res) => {
  try {
    console.log("req.body", req.body);

    const { _id, status } = req.body;

    // Check if required fields are provided
    if (!_id || !status) {
      return res.status(400).json({
        message: "Booking ID and status are required.",
        status: false,
      });
    }

    // Find the booking by ID
    const bookingstatus = await Booking.findById(_id);

    if (!bookingstatus) {
      return res.status(404).json({
        message: "Booking not found",
        status: false,
      });
    }

    // Update the status
    bookingstatus.status = status;

    // Save the updated document
    await bookingstatus.save();

    // Respond with success message
    res.status(200).json({
      message: `Booking status updated to ${status}`,
      status: true,
      data: bookingstatus,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);

    // Respond with an error message
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});

exports.BookingPayment = catchAsync(async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({
        message: "Booking ID  are required.",
        status: false,
      });
    }

    const bookingstatus = await Booking.findById(_id).populate({
      path: 'userId',
      select: "username email"
      //  model: 'User'
    });
    console.log("bookingstatus", bookingstatus)
    const subject = "Payment Link"
    if (bookingstatus) {
      try {
        await sendEmail(bookingstatus?.userId.email, bookingstatus?.userId.name, bookingstatus?.package, subject, emailTemplate  );
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        return errorResponse(res, 500, "Failed to send email notification.");
      }

      return successResponse(res, "You have successfully replied to the enquiry!");
    } else {
      return errorResponse(res, 400, "No changes were made to the enquiry.");
    }
  } catch (error) {
    console.error("Error updating booking status:", error);

    // Respond with an error message
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});