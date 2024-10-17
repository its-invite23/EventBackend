const { signup, login, profile, verifyToken, updateUserStatus, resetpassword, UserListIdDelete, UserUpdate, forgotlinkrecord, forgotpassword } = require("../controller/AuthController");

const expreesroute = require("express").Router();


expreesroute.post("/signup", signup)

expreesroute.post("/login", login)

expreesroute.get("/profile", verifyToken, profile)

expreesroute.post("/updated_status", updateUserStatus)

expreesroute.post("/forgot-password", forgotlinkrecord)

expreesroute.post("/forgot", verifyToken , forgotpassword)

expreesroute.post("/reset-password", verifyToken, resetpassword)

expreesroute.post("/delete", verifyToken, UserListIdDelete)

expreesroute.post("/update",verifyToken, UserUpdate)


module.exports = expreesroute