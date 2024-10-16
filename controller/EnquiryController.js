const  EnquireModal =  require("../model/Enquiry");
const catchAsync = require("../utils/catchAsync");
const  User = require("../model/User");

exports.EnquiryPost = catchAsync(async (req, res) => {
    const userId = req?.User?._id;
    console.log("userId",userId)
    if (!userId) {
        return res.status(400).json({
            status: false,
            message: "User information not found in the request or userId is undefined.",
        });
    }

    const { email, name, message } = req.body;

    const record = new EnquireModal({
        email, name, message ,userId
    });

    const result = await record.save();
    if (result) {
        res.json({
            status: true,
            message: "You have been Enquiry successfully !!.",
        });
    } else {
        res.json({
            status: false,
            error: result,
            message: "Failed to Enquiry.",
        });
    }
});


exports.EnquiryGet = catchAsync(async (req, res, next) => {
    try {

        const Enquiryget = await EnquireModal.find({});
        res.status(200).json({
            data: Enquiryget,
            msg: "Enquiryget Get",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Failed to fetch Enquiryget",
            error: error.message,
        });
    }
});


exports.EnquiryGetUser = catchAsync(async (req, res, next) => {
    try {
        const userId = req.User._id;
        const enquiries = await EnquireModal.find({ userId: userId }).populate({
            path: 'userId',
            select : "username email"
            //  model: 'User'
        });
        if (!enquiries || enquiries.length === 0) {
            return res.status(404).json({
                msg: "No enquiries found for this user",
            });
        }

        res.status(200).json({
            data: enquiries, 
            msg: "Enquiries with user data fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Failed to fetch enquiries",
            error: error.message,
        });
    }
});
