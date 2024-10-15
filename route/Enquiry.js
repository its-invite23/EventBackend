const enquire = require("express").Router();
const { verifyToken } = require("../controller/AuthController");
const { EnquiryPost, EnquiryGet } = require("../controller/EnquiryController");


enquire.post("/enquiry-post",verifyToken, EnquiryPost )
enquire.get("/enquiry-get", EnquiryGet )





module.exports = enquire