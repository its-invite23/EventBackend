const catchAsync = require("./catchAsync");
const Currency = require("../model/Currency")
const getRateMiddleware = catchAsync(async (req, res, next) => {
  try {
    const { currency } = req.body; 
    console.log("currency", currency);
    
    const data = await Currency.findOne({ currency: currency });
    console.log("data", data);
    
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Invalid currency name!",
        data: null,
      });
    }
    req.user_currency_rate = data.rate;
    next();
  } catch (error) {
    console.error("Error retrieving currency rate:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while retrieving the currency rate.",
      error: error.message,
    });
  }
});

module.exports = getRateMiddleware;
