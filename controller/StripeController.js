const Stripe = require("stripe");
const catchAsync = require("../utils/catchAsync");
const Payment = require("../model/payment.js");
const stripe = new Stripe(
  "sk_test_51QCE0sCstph9qeprpctSkisKqoAQJIFaYlzvOlGK4MtmSvGQ65sygCrmnOS9RtECApL92p7UEN4HWihz22zwTUte00ppjS5cXy"
);

exports.createCheckout = catchAsync(async (req, res) => {
  try {
    const { amount, email, userId, booking_id, currency } = req?.body;
    console.log({ amount, email, userId, booking_id, currency });
    console.log("req?.body", req?.body);

    const lastpayment = await Payment.findOne().sort({ srNo: -1 });
    const srNo = lastpayment ? lastpayment.srNo + 1 : 1;
    const newPayment = new Payment({
      srNo,
      payment_type: null,
      payment_id: null,
      currency,
      userId,
      booking_id,
      amount
    });
    await newPayment.save();

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: 'inr',
      payment_method_types: ['card'],
      receipt_email: email,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `http://localhost:3000/success/${srNo}`, 
      cancel_url: `http://localhost:3000/cancel/${srNo}`,
      submit_type: "pay",
      customer_email: email, 
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Booking Payment",
            },
            unit_amount: req.body.amount * 100, 
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          payment_intent_id: paymentIntent.id
        }
      }
    });

    // Store the payment ID and payment type in the database
    newPayment.payment_id = paymentIntent.id;
    newPayment.payment_type = paymentIntent.payment_method_types[0];
    await newPayment.save();

    res.status(200).json({
      url: session.url,
      status: "true",
      payment_id: paymentIntent.id,
      payment_type: paymentIntent.payment_method_types[0]
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});


exports.PaymentGet = catchAsync(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalpaymenttmodal = await Payment.countDocuments();
    const paymentget = await Payment.find({}).populate({
      path: "userId",
      select: "username",
    }).sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalpaymenttmodal / limit);
    res.status(200).json({
      data: {
        payment: paymentget,
        totalpaymenttmodal: totalpaymenttmodal,
        totalPages: totalPages,
        currentPage: page,
        perPage: limit,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
      msg: "Payment Get",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Failed to fetch Payment get",
      error: error.message,
    });
  }
});

exports.PaymentSuccess = catchAsync(async (req, res) => {
  try {
    const { srNo } = req.params;
    if (!srNo) {
      return res.status(400).json({
        message: "srNo is required.",
        status: false,
      });
    }
    const data = await Payment.findOne({srNo:srNo});
    if (!data) {
      return res.status(404).json({
        message: "Data not found",
        status: false,
      });
    }
    data.payment_status = "success";
    await data.save();
    res.status(200).json({
      message: `Payment status updated`,
      status: true,
      data: data,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});

exports.PaymentCancel = catchAsync(async (req, res) => {
  try {
    const { srNo } = req.params;
    if (!srNo) {
      return res.status(400).json({
        message: "srNo is required.",
        status: false,
      });
    }
    const data = await Payment.findOne({srNo:srNo});
    if (!data) {
      return res.status(404).json({
        message: "Data not found",
        status: false,
      });
    }
    data.payment_status = "failed";
    await data.save();
    res.status(200).json({
      message: `Payment status updated`,
      status: true,
      data: data,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
});