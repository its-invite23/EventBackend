const  contactmodal = require("../model/Contact");
const catchAsync = require('../utils/catchAsync');


exports.ContactPost = (async (req, res) => {
    const {  email , name } = req.body;

    const record = new contactmodal({
        email , name
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