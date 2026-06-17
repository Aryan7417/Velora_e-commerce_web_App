const Razorpay = require("razorpay");
const Payment = require("../modules/payment.modules.js");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
const createPayment = async (req, res) => {
  try {
    const { amount, userId, orderId } = req.body;

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const payment = await Payment.create({
      user: userId,
      order: orderId,
      razorpayOrderId: razorpayOrder.id,
      amount,
    });

    res.status(201).json({
      success: true,
      razorpayOrder,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id + "|" + razorpay_payment_id
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        status: "Success",
      }
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};



