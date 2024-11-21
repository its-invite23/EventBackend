const Booking = require("../model/Booking");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/EmailMailler");
const emailTemplate = require("../emailTemplates/PaymentLink");
const { errorResponse, successResponse } = require("../utils/ErrorHandling");
const nodemailer = require("nodemailer");

exports.bookingpost = catchAsync(async (req, res) => {
  const userId = req?.User?._id;
  if (!userId) {
    return res.status(400).json({
      status: false,
      message:
        "User information not found in the request or userId is undefined.",
    });
  }

  const {
    Package,
    package_name,
    bookingDate,
    location,
    status,
    attendees,
    totalPrice,
  } = req.body;

  try {
    const record = new Booking({
      package: Package,
      package_name,
      bookingDate,
      location,
      status,
      userId,
      attendees,
      totalPrice,
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
    const BookingData = await Booking.find({})
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "userId",
        select: "username email",
        //  model: 'User'
      });
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
      path: "userId",
      select: "username email",
      //  model: 'User'
    });
    console.log("bookingstatus", bookingstatus);
    const paymentLink = `https://user-event.vercel.app/payment/${bookingstatus?._id}`;
    const emailHtml = emailTemplate(paymentLink, bookingstatus?.userId?.username, bookingstatus?.totalPrice);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
        port: 587,
        secure: false,
      auth: {
        user: process.env.user,
        pass: process.env.password,
    },
    });
    await transporter.sendMail({
      from: process.env.user,
      to: bookingstatus.userId?.email,
      subject: "Payment Link for your Booking",
      html: emailHtml,
    });


    return successResponse(res, "Payment link sent successfully!");
  } catch (error) {
    console.error("Error updating booking status:", error);

    // Respond with an error message
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});

exports.BookingPrice = catchAsync(async (req, res) => {
  try {
    const { _id, price } = req.body;
    if (!_id || !price) {
      return res.status(400).json({
        message: "Booking ID and price both are required.",
        status: false,
      });
    }
    const bookingstatus = await Booking.findById(_id);
    if (!bookingstatus) {
      return res.status(404).json({
        message: "Booking not found",
        status: false,
      });
    }
    bookingstatus.totalPrice = price;
    await bookingstatus.save();
    res.status(200).json({
      message: `Booking Price Updated`,
      status: true,
      data: bookingstatus,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});
