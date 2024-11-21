const Stripe = require("stripe");
const catchAsync = require("../utils/catchAsync");
const Payment = require("../model/payment.js");
const stripe = new Stripe(
  "sk_test_51QCE0sCstph9qeprpctSkisKqoAQJIFaYlzvOlGK4MtmSvGQ65sygCrmnOS9RtECApL92p7UEN4HWihz22zwTUte00ppjS5cXy"
);

exports.createCheckout = catchAsync(async (req, res) => {
  try {
    const lastpayment = await Payment.findOne().sort({ srNo: -1 });
    const srNo = lastpayment ? lastpayment.srNo + 1 : 1;
    const newPayment = new Payment({
      srNo,
      currency: "inr",
      payment_type: "card",
      amount: req?.body?.amount
    });
    await newPayment.save();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:3000/success/123`, // Update this to a dynamic route if needed
      cancel_url: `http://localhost:3000/cancel/123`,
      submit_type: "pay",
      customer_email: "naveen@internetbusinesssolutionsindia.com", // Consider using a dynamic value if possible
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Total Payment",
            },
            unit_amount: req.body.amount * 100, // Stripe expects amounts in the smallest currency unit (e.g., paise for INR)
          },
          quantity: 1,
        },
      ],
    });

    res.status(200).json({
      url: session.url,
      status: "true",
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
    const paymentget = await Payment.find({}).sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalpaymenttmodal / limit);
    res.status(200).json({
      data: {
        Payment: paymentget,
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
