const express = require("express");
const router = express.Router();

const { createOrder,updateOrderStatus,getUserOrders} = require("../controllers/order.controller.js");

// router.get("/",(req,res)=>{
//     res.send("Order is route working")
// })

router.post("/", createOrder);
router.put("/:id/status",updateOrderStatus)
router.get("/user/:userId", getUserOrders);
console.log(getUserOrders);


module.exports = router;