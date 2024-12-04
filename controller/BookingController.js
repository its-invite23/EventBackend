const Booking = require("../model/Booking");
const User = require("../model/User");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/EmailMailler");
const emailTemplate = require("../emailTemplates/Booking");
const { errorResponse, successResponse } = require("../utils/ErrorHandling");
const nodemailer = require("nodemailer");
const { default: axios } = require("axios");

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
    CurrencyCode,
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
      CurrencyCode,
      userId,
      attendees,
      totalPrice,
    });

    await record.save();
    const userDetail = await User.findById(userId);
    const subject = "Booking request made successfully!";
    await sendEmail({ email: userDetail.email, username: userDetail.username, message: "Your booking request was successful!", subject: subject, emailTemplate: emailTemplate });

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
    const limit = parseInt(req.query.limit) || 25;
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
      message: `Booking status updated and ${status}`,
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
    const { _id, payment_genrator_link } = req.body;
    if (!_id) {
      return res.status(400).json({
        message: "Booking ID  are required.",
        status: false,
      });
    }

    const updatedRecord = await Booking.findByIdAndUpdate(
      _id,
      { payment_genrator_link },
      { new: true, runValidators: true }
    );

    const bookingstatus = await Booking.findById(_id).populate({
      path: "userId",
      select: "username email",
      //  model: 'User'
    });
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
    const { _id, price, currency } = req.body;
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
    bookingstatus.CurrencyCode = currency;
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


exports.BookingGetByID = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Booking ID is required.",
        status: false,
      });
    }

    const booking = await Booking.findById(id).populate({
      path: "userId",
      select: "username email",
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        status: false,
      });
    }

    // Define a function to fetch place details using Google Maps API
    const fetchPlaceDetails = async (placeId) => {
      try {
        const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Google API key
        const placeUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;
        const placeResponse = await axios.get(placeUrl);

        if (placeResponse.data.status !== 'OK') {
          throw new Error(placeResponse.data.error_message || 'Failed to fetch place details');
        }

        const placeDetails = placeResponse.data.result;

        // Extract photo URLs from photo references
        const photoUrls = placeDetails.photos ? placeDetails.photos.map(photo => {
          return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`;
        }) : [];

        placeDetails.photoUrls = photoUrls; // Add photo URLs to place details
        return placeDetails;
      } catch (error) {
        console.error("Error fetching place details:", error);
        return null;
      }
    };
    const updatedPackage = await Promise.all(booking.package.map(async (pkg) => {
      if (pkg.place_id) {
        const placeDetails = await fetchPlaceDetails(pkg.place_id);
        if (placeDetails) {
          return { ...pkg, placeDetails }; // Merge place details into the package
        }
      }
      return pkg; // If place_id is missing or place details could not be fetched, return the original package
    }));

    // Update the booking with the new package details
    booking.package = updatedPackage;

    res.status(200).json({
      message: "Data retrieved successfully",
      status: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});


exports.PaymentGetId = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Payment ID is required.",
      });
    }
    // Fetch the current package record by ID
    const packageRecord = await Booking.findById(id)

    if (!packageRecord) {
      return res.status(404).json({
        status: false,
        message: "Booking not found!",
      });
    }

    res.status(200).json({
      status: true,
      data: packageRecord,
      message: `Booking successfully.`,
    });

  } catch (error) {
    console.error("Error updating package record:", error);

    res.status(500).json({
      status: false,
      message: "An error occurred while updating the package. Please try again later.",
      error: error.message,
    });
  }
});


exports.BookingFilter = catchAsync(async (req, res, next) => {
  try {
    const { package_name } = req.body;  
    let filter = {};
    if (package_name) {
      filter.package_name = { $regex: `^${package_name}$`, $options: 'i' };
    }
    const filterdata = await Booking.find(filter);
    return res.status(200).json({
      status: true,
      filterdata: filterdata,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching booking.",
      error: error.message,
    });
  }
});