const express = require("express");
const router = express.Router();

const { createOrder,updateOrderStatus } = require("../controllers/order.controller");

// router.get("/",(req,res)=>{
//     res.send("Order is route working")
// })

router.post("/", createOrder);
router.put("/:id/status",updateOrderStatus)


module.exports = router;