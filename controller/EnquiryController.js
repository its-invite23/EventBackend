const  EnquireModal =  require("../model/Enquiry");
const catchAsync = require("../utils/catchAsync");
const emailTemplate = require("../emailTemplates/replyMessage");
const sendEmail = require("../utils/EmailMailler");

exports.EnquiryPost = catchAsync(async (req, res) => {
    const userId = req?.User?._id;
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



exports.EnquiryUpdateStatus = catchAsync(async (req, res) => {
    try {
        const { _id, enquire_status } = req.body;
        if (!_id || !enquire_status) {
            return res.status(400).json({
                message: "enquire ID and status are required.",
                status: false,
            });
        }

        const Enquire = await EnquireModal.findById(_id);
        if (!Enquire) {
            return res.status(404).json({
                message: "EnquireModal not found",
                status: false,
            });
        }

        Enquire.enquire_status = enquire_status;
        await Enquire.save();

        res.status(200).json({
            message: `Enquiry status updated to ${enquire_status}`,
            status: true,
            data: Enquire,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            status: false,
        });
    }
});


// exports.EnquiryReply = async (req, res) => {
//     const { email, reply_message, name } = req.body;

//     try {
//         const EmailFind = await EnquireModal.findOne({ email });
//         console.log("EmailFind", EmailFind);

//         if (!EmailFind) {
//             return res.status(400).json({
//                 message: "Email Not Found",
//                 status: false,
//             });
//         }

//         const result = await EnquireModal.findByIdAndUpdate(
//             EmailFind._id, 
//             { 
//                 reply_message, 
//                 enquire_status: "completed", 
//                 name 
//             },
//             { new: true }
//         );

//         if (result) {
//             const customerEmail = result.email;
//             const customerUser = result.name;
//             const customerReply = result.reply_message;
//             let transporter = nodemailer.createTransport({
//                 host: "smtp.gmail.com",
//                 port: 587,
//                 secure: false,
//                 auth: {
//                     user: process.env.user, 
//                     pass: process.env.password, 
//                 },
//             });
//             const emailHtml = emailTemplate( customerUser ,customerReply );
//             let info = await transporter.sendMail({
//                 from: process.env.user,
//                 to: customerEmail,
//                 subject: 'Thank You for Enquiry Us',
//                 html: emailHtml, 
//             });
//             console.log('Email sent to user account');
//         }
//         if (result) {
//             return res.json({
//                 status: true,
//                 message: "You have successfully replied to your query!",
//             });
//         } else {
//             return res.status(400).json({
//                 status: false,
//                 message: "No changes made.",
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             error: error.message,
//             message: "Failed to update the contact.",
//         });
//     }
// };



exports.EnquiryReply = async (req, res) => {
    const { email, reply_message, name } = req.body;

    try {
        const EmailFind = await EnquireModal.findOne({ email });
        console.log("EmailFind", EmailFind);

        if (!EmailFind) {
            return res.status(400).json({
                message: "Email Not Found",
                status: false,
            });
        }

        const result = await EnquireModal.findByIdAndUpdate(
            EmailFind._id,
            {
                reply_message,
                enquire_status: "completed",
                name
            },
            { new: true }
        );
const subject = "Thank You for Enquiry US"
        if (result) {
            await sendEmail(result.email, result.name, result.reply_message ,subject ,emailTemplate); // Use the middleware to send the email
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
