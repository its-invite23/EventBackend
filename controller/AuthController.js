const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../model/User');
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const { response } = require('express');

exports.verifyToken = async (req, res, next) => {
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        let token = authHeader.split(" ")[1];
        if (!token) {
            res.status(400).json({
                status: false,
                message: "User is not authorized or Token is missing",
            });
        } else {
            try {
                const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
                if (decode) {
                    let result = await User.findById(decode.id);
                    req.user = result;
                    next();
                } else {
                    res.status(401).json({
                        status: false,
                        message: 'Uauthorized',
                    })
                }
            } catch (err) {
                console.log("err", err)
                res.status(401).json({
                    status: false,
                    message: 'Invalid or expired token',
                    error: err
                });
            }
        }
    } else {
        res.status(400).json({
            status: false,
            message: "User is not authorized or Token is missing",
        })
    }
};

const signToken = async (id) => {
    const token = jwt.sign(
        { id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '14400m' }
    );
    return token
}



exports.signup = catchAsync(async (req, res) => {
    const { email, password, username, address, phone_number, city } = req.body;

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
        password: hashedPassword, 
        username,
        address,
        phone_number,
        city
    });

    const result = await record.save();
    if (result) {
        res.json({
            status: true,
            message: "You have been registered successfully !!.",
        });
    } else {
        res.json({
            status: false,
            error: result,
            message: "Failed to create user.",
        });
    }
});

exports.login = catchAsync(async (req, res, next) => {
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
    if (user.user_status === 'inactive') {
        return res.status(403).json({
            status: false,
            message: "Your account is inactive. Please contact support.",
        });
    }
    const token = await signToken(user._id)
    res.json({
        status: true,
        message: "Login Successfully!",
        token,
    });
});


exports.profile = catchAsync(async (req, res, next) => {
    try {
        const userprofile = await User.find({}).select('-password');
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

        user.user_status = user_status;
        await user.save();

        res.status(200).json({
            message: `User status updated to ${user_status}`,
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

