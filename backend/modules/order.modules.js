const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },

  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },

  products: [
    {
      product: {
        type: String
      },
      quantity: Number
    }
  ],

  totalAmount: Number,

  status: {
    type: String,
    default: "Pending"
  }

}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema);