const { signup } = require("../controller/AuthController");

const expreesroute = require("express").Router();


expreesroute.get("/api/singup" , signup)

module.exports = expreesroute