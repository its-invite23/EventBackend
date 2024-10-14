const { signup, login } = require("../controller/AuthController");

const expreesroute = require("express").Router();


expreesroute.post("/signup" , signup)

expreesroute.post("/login", login)

module.exports = expreesroute