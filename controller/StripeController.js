const Stripe = require("stripe");
const catchAsync = require("../utils/catchAsync");
const Payment = require("../model/payment.js");
const payment = require("../model/payment.js");
const StripeKey = process.env.STRIPE_TEST_KEY
const stripe = new Stripe("sk_test_51QCE0sCstph9qeprpctSkisKqoAQJIFaYlzvOlGK4MtmSvGQ65sygCrmnOS9RtECApL92p7UEN4HWihz22zwTUte00ppjS5cXy");

const fetchPaymentId = async (sessionId, srNo) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentId = session.payment_intent;
    if (!srNo) {
      return;
    }
    const data = await Payment.findOne({ srNo: srNo });
    if (!data) {
      return;
    }
    data.payment_id = paymentId;
    // datas.payment_type = data.paymentMethod;
    await data.save();
    return;
  } catch (error) {
    console.error('Error fetching payment ID:', error);
  }
};

exports.createCheckout = catchAsync(async (req, res) => {
  try {
    const { amount, email, userId, booking_id, currency } = req?.body;
console.log("req?.body",req?.body)
    const lastpayment = await Payment.findOne().sort({ srNo: -1 });
    const srNo = lastpayment ? lastpayment.srNo + 1 : 1;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `https://user-event.vercel.app/success/${srNo}`,
      cancel_url: `https://user-event.vercel.app/cancel/${srNo}`,
      submit_type: "pay",
      customer_email: email,
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Booking Payment",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
    });

    const newPayment = new Payment({
      srNo,
      payment_type: "card",
      payment_id: null,
      session_id: session?.id,
      currency,
      userId,
      booking_id,
      amount,
    });
    await newPayment.save();
    res.status(200).json({ url: session.url, status: "true" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

exports.PaymentGet = catchAsync(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    const totalpaymenttmodal = await Payment.countDocuments();
    const paymentget = await Payment.find({})
      .populate({
        path: "userId",
        select: "username",
      })
      .sort({ created_at: -1 })
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
    const data = await Payment.findOne({ srNo: srNo });
    if (!data) {
      return res.status(404).json({
        message: "Data not found",
        status: false,
      });
    }
    data.payment_status = "success";
    await data.save();
    fetchPaymentId(data?.session_id, srNo);
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
    const data = await Payment.findOne({ srNo: srNo });
    if (!data) {
      return res.status(404).json({
        message: "Data not found",
        status: false,
      });
    }
    data.payment_status = "failed";
    await data.save();
    fetchPaymentId(data?.session_id, srNo);
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

exports.PaymentId = catchAsync(async (req, res, next) => {
  const { sessionId } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentId = session.payment_intent; // This is your payment ID 
    res.json({ paymentId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


