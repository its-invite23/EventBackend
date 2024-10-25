const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../model/User");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const ForgetPassword = require("../emailTemplates/ForgetPassword");
const Booking = require("../model/Booking");
const Enquiry = require("../model/Enquiry");
const Package = require("../model/packages");

exports.verifyToken = async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        status: false,
        message: "User is not authorized or Token is missing",
      });
    } else {
      try {
        const decode = await promisify(jwt.verify)(
          token,
          process.env.JWT_SECRET_KEY
        );
        if (decode) {
          let result = await User.findById({ _id: decode.id });
          if (result) {
            req.User = result;
            next();
          } else {
            return res.status(404).json({
              status: false,
              message: "User not found",
            });
          }
        } else {
          return res.status(401).json({
            status: false,
            message: "Unauthorized",
          });
        }
      } catch (err) {
        return res.status(401).json({
          status: false,
          message: "Invalid or expired token",
          error: err,
        });
      }
    }
  } else {
    return res.status(400).json({
      status: false,
      message: "User is not authorized or Token is missing",
    });
  }
};

const signToken = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "14400m",
  });
  return token;
};

exports.signup = catchAsync(async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      address,
      phone_number,
      country,
      state,
      city,
    } = req.body;
    let isAlready = await User.findOne({ email });
    if (isAlready) {
      return res.status(200).json({
        status: false,
        message: "User already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const record = new User({
      email,
      country,
      state,
      city,
      password: hashedPassword,
      username,
      address,
      phone_number: phone_number,
    });
    const result = await record.save();
    if (result) {
      res.status(201).json({
        status: true,
        message: "You have been registered successfully !!.",
      });
    } else {
      res.status(500).json({
        status: false,
        error: result,
        message: "Failed to create user.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: false,
        message: "Email and password are required!",
      });
    }

    const user = await User.findOne({ email });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: false,
        message: "Incorrect password. Please try again.",
      });
    }
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid Email or password",
      });
    }
    if (user.user_status === "inactive") {
      return res.status(403).json({
        status: false,
        message: "Your account is inactive. Please contact support.",
      });
    }
    const token = await signToken(user._id);
    res.json({
      status: true,
      message: "Login Successfully!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});


exports.profile = catchAsync(async (req, res, next) => {
  try {
    // Input validation
    const page = Math.max(parseInt(req.query.page) || 1, 1); // Ensure page is at least 1
    const limit = Math.max(parseInt(req.query.limit) || 10, 1); // Ensure limit is at least 1
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments({ role: "user", isDeleted: false });
    const users = await User.find({ role: "user", isDeleted: false })
      .select("-password")
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalUsers / limit);

    return res.status(200).json({
      status: true,
      message: "Users retrieved successfully",
      data: {
        users: users,
        totalUsers: totalUsers,
        totalPages: totalPages,
        currentPage: page,
        perPage: limit,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error); // Log full error for debugging
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching users.",
      error: error.message || "Internal Server Error", // Provide a fallback error message
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

    res.status(500).json({
      status: false,
      message:
        "An error occurred while updating the User. Please try again later.",
      error: error.message,
    });
  }
});
exports.forgotlinkrecord = async (req, res) => {
  try {
    const { email } = req.body;
    const record = await User.findOne({ email: email });
    if (record && record.email !== " ") {
      const customerEmail = record.email;
      const customerUser = record.username;
      const resetLink = `http://localhost:3000/forgetlink/${record._id}`;
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.user,
          pass: process.env.password,
        },
      });
      const emailHtml = ForgetPassword(resetLink, customerUser);
      let info = await transporter.sendMail({
        from: "ankitkumarjain0748@gmail.com",
        to: customerEmail,
        subject: "Reset Your Password",
        html: emailHtml,
      });
      console.log("Email sent to user account");
    }
    res.json({
      status: true,
      message: "Email has been sent to your registered email",
    });
  } catch (error) {
    console.error("Error in forget password process:", error);
    res.json({
      status: false,
      message: "Failed to send email",
    });
  }
};
exports.forgotpassword = async (req, res) => {
  try {
    const _id = req?.User?._id;
    const { npass } = req.body;
    const record = await User.findById(_id);
    if (!record) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(npass, 10);
    await User.findByIdAndUpdate(_id, { password: hashedPassword });
    res.json({ status: true, message: "Password successfully changed" });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ status: false, message: "Failed to change password" });
  }
};



exports.profilegettoken = catchAsync(async (req, res, next) => {
  try {
    const user = req?.User?._id
    const userprofile = await User.findById({ _id: user }).select('-password');
    res.status(200).json({
      data: userprofile,
      msg: "Profile Get",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Failed to fetch profile",
      error: error.message,
    });
  }
});



exports.userfilter = catchAsync(async (req, res, next) => {
  try {
    const { username, user_status } = req.body;  // Changed to req.query for query params
    console.log("req.query", req.body); // Updated to log query parameters
    let filter = {};

    if (user_status) {
      filter.user_status = user_status;
    }

    if (username) {
      // Perform an exact match with case insensitivity if required
      filter.username = { $regex: `^${username}$`, $options: 'i' };
    }

    console.log("filter", filter);
    const users = await User.find(filter).select("-password");

    console.log("users", users);
    return res.status(200).json({
      status: true,
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching users.",
      error: error.message,
    });
  }
});




// ashboardApi

exports.getCount = catchAsync(async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const RecentCount = await Enquiry.countDocuments();
    const packages = await Package.find({}).limit(3).select("package_name package_image package_categories");
    const EnquiryData = await Enquiry.find({}).limit(3);
    return res.status(200).json({
      status: true,
      message: "User count retrieved successfully",
      userCount: userCount,
      bookingCount: bookingCount,
      EnquiryCount: RecentCount,
      packages: packages,
      EnquiryData: EnquiryData
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching the user count.",
      error: error.message,
    });
  }
});





















// if (username) {
//   // Perform an exact match instead of regex if required
//   filter.username = username;  // Use exact match
//   // Or if you want partial match, uncomment below and comment out above line
//   // filter.username = { $regex: `^${username}$`, $options: 'i' };
// }