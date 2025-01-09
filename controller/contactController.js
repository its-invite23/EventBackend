const EmailContact = require("../emailTemplates/ContactReply");
const contactmodal = require("../model/Contact");
const catchAsync = require('../utils/catchAsync');
const sendEmail = require("../utils/EmailMailler");

exports.ContactPost = catchAsync(async (req, res) => {
    const { email, name, message, phone_code, phone_number } = req.body;

    const record = new contactmodal({
        email, name, message, phone_code, phone_number
    });

    const result = await record.save();
    if (result) {
        res.json({
            status: true,
            message: "Request Sent Successfully!!.",
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalcontactmodal = await contactmodal.countDocuments();
        const Contactget = await contactmodal.find({}).sort({ created_at: -1 })
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalcontactmodal / limit);
        res.status(200).json({
            data: {
                Contactget: Contactget,
                totalcontactmodal: totalcontactmodal,
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

exports.ContactReply = catchAsync(
    async (req, res) => {
        const { _id, reply_message } = req.body;
        try {
            const EmailFind = await contactmodal.findById(_id);
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
                },
                { new: true }
            );

            const subject = "Thank You For Contacting Us!";
            if (result) {
                await sendEmail(
                    {
                        email: result.email,
                        name: result.name?.split(' ')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase())?.join(' '),
                        message: result?.reply_message,
                        subject: subject,
                        emailTemplate: EmailContact
                    }
                ); // Use the middleware to send the email
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
    }
);
exports.Emailcheck = async (req, res) => {
    try {
        const result = {
            email: "ankit.jain@futureprofilez.com",
            name: "ankitjain",
            reply_message: "Thank you for reaching out. We appreciate your feedback."
        };
        const subject = "Thank You for Contacting Us";
        await sendEmail(subject, result.email, result.name, EmailBooking);
        return res.json({
            status: true,
            message: "You have successfully replied to your query!",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message,
            message: "Failed to send the email.",
        });
    }
};
