const  ContactRoute =  require("express").Router();
const { ContactPost, ContactGet } = require("../controller/contactController");



ContactRoute.post("/contact-add" ,ContactPost )

ContactRoute.get("/contact-get" , ContactGet)


module.exports = ContactRoute;