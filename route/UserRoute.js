const { signup, login, profile, verifyToken } = require("../controller/AuthController");

const expreesroute = require("express").Router();


expreesroute.post("/signup" , signup)

expreesroute.post("/login", login)

expreesroute.get("/user/profile" ,verifyToken, profile)

module.exports = expreesroute