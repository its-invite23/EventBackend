const { signup, login, profile, verifyToken, updateUserStatus } = require("../controller/AuthController");

const expreesroute = require("express").Router();


expreesroute.post("/signup" , signup)

expreesroute.post("/login", login)

expreesroute.get("/profile" ,verifyToken, profile)

expreesroute.post("/updated_status" , updateUserStatus)

module.exports = expreesroute