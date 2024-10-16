const enquire = require("express").Router();
const { verifyToken } = require("../controller/AuthController");
const { EnquiryPost, EnquiryGet, EnquiryGetUser } = require("../controller/EnquiryController");
enquire.post("/enquiry-post", verifyToken, EnquiryPost)
enquire.get("/enquiry-get", EnquiryGet)

enquire.get("/enquire-user-get" , verifyToken ,  EnquiryGetUser)


module.exports = enquire