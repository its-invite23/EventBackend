const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../model/User");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const ForgetPassword = require("../emailTemplates/ForgetPassword");
const Booking = require("../model/Booking");
const { validationErrorResponse, errorResponse, successResponse } = require("../utils/ErrorHandling");
const VerifyAccount = require("../emailTemplates/Otp");
const VerifyAccounts = require("../emailTemplates/VerifyAccount");
const logger = require("../utils/Logger");

exports.verifyToken = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json({
        status: false,
        message: "Token is missing or malformed",
      });
    }

    // Extract the token
    let token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    const decode = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    if (!decode) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized or invalid token",
      });
    }

    // Check the user in the database
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Attach user to request object and proceed
    req.User = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
}
const signToken = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "14400m",
  });
  return token;
};

const signEmail = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15m",
  });
  return token;
};


const filterUsers = async (username) => {
  try {
    let filter = {};
    // Add `username` to filter for partial match
    if (username && username.trim() !== "") {
      filter.username = { $regex: username, $options: "i" }; // Partial match with case-insensitive regex
    }
    // Fetch users based on the filter
    const users = await User.find(filter).select("-password");

    // Return the users found or an appropriate message if no users are found

    // Return users if found
    return users;
  } catch (error) {
    console.error("Error fetching booking:", error);
    logger.error("Error fetching booking:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching bookings.",
      error: error.message,
    });
  }
};

// exports.userfilter = catchAsync(async (req, res, next) => {
//   const { username, user_status } = req.body; // Use req.body for body params, or req.query for query params

//   // Use the filterUsers function to get the filtered users
//   const result = await filterUsers(username, user_status);

//   // Return the result as the response
//   res.status(result.status ? 200 : 500).json(result);
// });

exports.signup = catchAsync(async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      address,
      phone_number,
      country_code,
      phone_code,
      country,
      state,
      DOB,
      city,
    } = req.body;

    // Check if required fields are provided
    if (!password || !phone_number || !username || !email || !address || !country || !city) {
      return res.status(401).json({
        status: false,
        message: 'All fields are required',
      });
    }

    // Check if user already exists
    // Check if user already exists
    const existingUser = await User.find({ $or: [{ email }, { phone_number }] });
    console.log("existingUser", existingUser);

    if (existingUser.length > 0) {
      const errors = {};
      existingUser.forEach(user => {
        if (user.email === email) {
          errors.email = 'Email is already in use!';
        }
        if (user.phone_number === phone_number) {
          errors.phone_number = 'Phone number is already in use!';
        }
      });

      return res.status(400).json({
        status: false,
        message: 'Email or phone number already exists',
        errors,
      });
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user record
    const record = new User({
      email,
      country,
      state,
      phone_code,
      country_code,
      city,
      password: hashedPassword,
      username,
      DOB,
      address,
      phone_number,
    });

    const result = await record.save();

    if (result) {
      const id = record._id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });
      const resetLink = `https://www.its-invite.com/verify/${token}`;
      const customerUser = record.username;

      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST, port: process.env.MAIL_PORT, secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const emailHtml = VerifyAccounts(resetLink, customerUser);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: result.email,
        subject: "Verify your Account",
        html: emailHtml,
      });

      return successResponse(res, "You have been registered successfully !!", 201);
    } else {
      return errorResponse(res, "Failed to create user.", 500);
    }
  } catch (error) {
    return errorResponse(res, error.message || "Internal Server Error", 500);
  }
});

exports.OTP = catchAsync(async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      address,
      phone_number,
      country_code,
      phone_code,
      country,
      state,
      DOB,
      city,
    } = req.body;

    // Check if required fields are provided
    if (!password || !phone_number || !username || !email || !address || !country || !city) {
      return res.status(401).json({
        status: false,
        message: 'All fields are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone_number }] });
    console.log("existingUser", existingUser)
    if (existingUser) {
      const errors = {};
      if (existingUser.email === email) {
        errors.email = 'Email is already in use!';
      }
      if (existingUser.phone_number === phone_number) {
        errors.phone_number = 'Phone number is already in use!';
      }
      return res.status(400).json({
        status: false,
        message: 'Email or phone number already exists',
        errors,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const otp = generateOTP();

    const record = new User({
      email,
      country,
      state,
      phone_code,
      country_code,
      city,
      password: hashedPassword,
      username,
      DOB,
      address,
      phone_number,
      OTP: otp,
    });

    const result = await record.save();

    if (result) {
      const customerUser = record.username;
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST, port: process.env.MAIL_PORT, secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const emailHtml = VerifyAccount(otp, customerUser);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: result.email,
        subject: "Verify your Account",
        html: emailHtml,
      });

      return successResponse(res, "OTP has been sent to your email!", 201);
    } else {
      return errorResponse(res, "Failed to create user.", 500);
    }
  } catch (error) {
    return errorResponse(res, error.message || "Internal Server Error", 500);
  }
});


exports.VerifyOtp = catchAsync(async (req, res, next) => {
  try {
    const { email, OTP } = req.body;

    if (!email || !OTP) {
      return res.status(401).json({
        status: false,
        message: "Email and OTP are required!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid Email or OTP",
      });
    }

    if (user.OTP != OTP) {
      return res.status(401).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    user.verified = true;
    await user.save();

    const token = await signToken(user._id);
    res.json({
      status: true,
      message: "Your account has been verified.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "An unknown error occurred. Please try later.",
    });
  }
});


exports.adminlogin = catchAsync(async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(401).json({
        status: false,
        message: "Email and password are required!",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid Email or password",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Check if the user account is inactive
    if (user.user_status === "inactive") {
      return res.status(403).json({
        status: false,
        message: "Your account is inactive. Please contact support.",
      });
    }

    // Check if the user is verified
    if (!user.verified) {
      return res.status(403).json({
        status: false,
        message: "Your account is not verified. Please verify it.",
      });
    }

    // Validate user role
    if (user.role !== role) {
      return res.status(403).json({
        status: false,
        message: "Access denied. Only admins can log in.",
      });
    }

    // Generate a token for the user
    const token = await signToken(user._id);
    res.json({
      status: true,
      message: "Login Successfully!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "An unknown error occurred. Please try later.",
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(401).json({
        status: false,
        message: "Email and password are required!",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid Email or password",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Check if the user account is inactive
    if (user.user_status === "inactive") {
      return res.status(403).json({
        status: false,
        message: "Your account is inactive. Please contact support.",
      });
    }

    // Check if the user is verified
    if (!user.verified) {
      return res.status(403).json({
        status: false,
        message: "Your account is not verified. Please verify it.",
      });
    }

    // Validate user role
    if (user.role !== "user") {
      return res.status(403).json({
        status: false,
        message: "Access denied. Only user can log in.",
      });
    }

    // Generate a token for the user
    const token = await signToken(user._id);
    res.json({
      status: true,
      message: "Login Successfully!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "An unknown error occurred. Please try later.",
    });
  }
});


exports.profile = catchAsync(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const search = req.query.search || "";
    let userData, totalPages, totaluser;

    // Fetch users based on the filter
    const filter = { role: "user", isDeleted: false };
    const skip = (page - 1) * limit; // Calculate skip value

    const users = await User.find(filter)
      .select("-password")
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);

    const updates = users.map(async (user) => {
      const enquiryCount = await Booking.countDocuments({ userId: user._id }); // Count bookings for the user
      return User.updateOne({ _id: user._id }, { $set: { enquiry_count: enquiryCount } }); // Update user
    });

    if (search === "") {
      const skip = (page - 1) * limit;
      totaluser = await User.countDocuments();
      userData = await User.find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
      totalPages = Math.ceil(totaluser / limit);
    }
    else {
      userData = await filterUsers(search);
      totalPages = 1;
      totaluser = userData;
    }
    res.status(200).json({
      data: {
        userData: userData,
        totaluser: totaluser,
        totalPages: totalPages,
        currentPage: page,
        perPage: limit,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
      msg: "User Get",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Failed to fetch User get",
      error: error.message,
    });
  }
});


exports.updateUserStatus = catchAsync(async (req, res) => {
  try {
    const { _id, user_status } = req.body;
    if (!_id || !user_status) {
      return res.status(400).json({
        message: "User ID and status are required.",
        status: false,
      });
    }
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }
    const newStatus = user.user_status === "active" ? "inactive" : "active";
    user.user_status = newStatus;
    await user.save();

    res.status(200).json({
      message: `User status updated to ${user?.user_status}`,
      status: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    logger.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});

exports.resetpassword = catchAsync(async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password has been reset successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
});

exports.UserListIdDelete = catchAsync(async (req, res, next) => {
  try {
    const { Id } = req.body;
    if (!Id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required.",
      });
    }
    const record = await User.findOneAndUpdate(
      { _id: Id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!record) {
      return res.status(404).json({
        status: false,
        message: "User not found or already deleted.",
      });
    }

    res.status(200).json({
      status: true,
      data: record,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting user record:", error);
    logger.error("Error deleting user record:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
});

exports.UserUpdate = catchAsync(async (req, res, next) => {
  try {
    const { Id, email, username, address, phone_number, city } = req.body;
    if (!Id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required.",
      });
    }
    const updatedRecord = await User.findByIdAndUpdate(
      Id,
      { email, username, address, phone_number, city },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        status: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      status: true,
      data: updatedRecord,
      message: "User updated successfully.",
    });
  } catch (error) {
    console.error("Error updating User record:", error);
    logger.error("Error updating User record:", error);

    res.status(500).json({
      status: false,
      message:
        "An error occurred while updating the User. Please try again later.",
      error: error.message,
    });
  }
});

exports.forgotlinkrecord = catchAsync(
  async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return validationErrorResponse(res, { email: 'Email is required' });
      }
      const record = await User.findOne({ email: email });
      if (!record) {
        return errorResponse(res, "No user found with this email", 404);
      }
      const token = await signEmail(record._id);
      const resetLink = `https://user-event.vercel.app/forgotpassword/${token}`;
      const customerUser = record.username;
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST, port: process.env.MAIL_PORT, secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const emailHtml = ForgetPassword(resetLink, customerUser);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: record.email,
        subject: "Reset Your Password",
        html: emailHtml,
      });


      return successResponse(res, "Email has been sent to your registered email");

    } catch (error) {
      console.error("Error in forgot password process:", error);
      logger.error("Error in forgot password process:", error);
      return errorResponse(res, "Failed to send email");
    }
  }
);

exports.forgotpassword = catchAsync(
  async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);
      if (!user) {
        return errorResponse(res, "User not found", 404);
      }
      user.password = await bcrypt.hash(newPassword, 12);
      await user.save();
      return successResponse(res, "Password has been successfully reset");
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return errorResponse(res, "Token has expired. Please generate a new token.", 401);
      }
      console.error("Error in password reset process:", error);
      logger.error("Error in password reset process:", error);
      return errorResponse(res, "Failed to reset password");
    }
  }
);


exports.profilegettoken = catchAsync(async (req, res, next) => {
  try {
    const userId = req?.User?._id;

    if (!userId) {
      return res.status(401).json({
        status: false,
        message: "User is not authorized or Token is missing",
      });
    }

    const userprofile = await User.findById(userId).select('-password');
    if (!userprofile) {
      return res.status(404).json({
        status: false,
        message: "User profile not found",
      });
    }

    res.status(200).json({
      status: true,
      data: userprofile,
      message: "Profile retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
});


exports.VerifyUser = catchAsync(
  async (req, res) => {
    try {
      const { token } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);
      if (!user) {
        return errorResponse(res, "User not found", 404);
      }
      user.verified = true;
      await user.save();
      return successResponse(res, "Password has been successfully reset");
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return errorResponse(res, "Token has expired. Please contact support.", 401);
      }
      console.error("Error in verifying account:", error);
      logger.error("Error in verifying account:", error);
      return errorResponse(res, "Failed to verify account");
    }
  }
);
