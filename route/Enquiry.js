const enquire = require("express").Router();
const { verifyToken } = require("../controller/AuthController");
const { EnquiryPost, EnquiryGet, EnquiryGetUser, EnquiryUpdateStatus } = require("../controller/EnquiryController");
enquire.post("/enquiry-post", verifyToken, EnquiryPost)
enquire.get("/enquiry-get", EnquiryGet)
enquire.get("/enquire-user-get" , verifyToken ,  EnquiryGetUser);
enquire.post("/enquire-update-status" , EnquiryUpdateStatus)


module.exports = enquire