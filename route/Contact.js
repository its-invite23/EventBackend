const ContactRoute = require("express").Router();

const { ContactPost, ContactGet, ContactReply } = require("../controller/contactController");



ContactRoute.post("/contact-add", ContactPost)

ContactRoute.get("/contact-get", ContactGet);

ContactRoute.post("/contact-reply", ContactReply)


module.exports = ContactRoute;