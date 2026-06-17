const Order = require("../modules/order.modules.js");

const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;

    const order = await Order.create({
      user,
      products,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
};