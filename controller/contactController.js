const emailTemplate = require("../emailTemplates/replyMessage");
const contactmodal = require("../model/Contact");
const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');
const sendEmail = require("../utils/EmailMailler");


exports.ContactPost = (async (req, res) => {
    const { email, name } = req.body;

    const record = new contactmodal({
        email, name
    });

    const result = await record.save();
    if (result) {
        res.json({
            status: true,
            message: "You have been Contact successfully !!.",
        });
    } else {
        res.json({
            status: false,
            error: result,
            message: "Failed to Contact.",
        });
    }
});


exports.ContactGet = catchAsync(async (req, res, next) => {
    try {
        const Contactget = await contactmodal.find({});
        res.status(200).json({
            data: Contactget,
            msg: "Contact Get",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Failed to fetch Contact get",
            error: error.message,
        });
    }
});

exports.ContactReply = async (req, res) => {
    const { email, reply_message, name } = req.body;

    try {
        const EmailFind = await contactmodal.findOne({ email });

        if (!EmailFind) {
            return res.status(400).json({
                message: "Email Not Found",
                status: false,
            });
        }

        const result = await contactmodal.findByIdAndUpdate(
            EmailFind._id,
            {
                reply_message,
                contact_status: "read",
                name
            },
            { new: true }
        );
        const subject = "Thank You for Contact US"
        if (result) {
            await sendEmail(result.email, result.name, result.reply_message, subject, emailTemplate); // Use the middleware to send the email
            return res.json({
                status: true,
                message: "You have successfully replied to your query!",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "No changes made.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message,
            message: "Failed to update the contact.",
        });
    }
};

