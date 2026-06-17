const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/order.controller");

// router.get("/",(req,res)=>{
//     res.send("Order is route working")
// })

router.post("/", createOrder);

module.exports = router;