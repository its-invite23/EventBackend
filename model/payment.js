const mongoose = require("mongoose")

const paymentmongoose = mongoose.Schema({


  Payment_status: {
    type: String,
    default: "pending"
  },
  payment_type: {
    type: String,
    required: true
  },
  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
})

const payment = mongoose.model("payment", paymentmongoose);

module.exports = payment;