const express =require("express")
const router = express.Router()

const { registerUser, loginUser, logout } = require("../controllers/auth.controller.js")

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logout)

console.log("registerUser =", registerUser);
console.log("loginUser =", loginUser);
module.exports = router