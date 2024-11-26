
const dotenv = require("dotenv");
const UserRoute = require("./route/UserRoute")
const enauiryroute = require("./route/Enquiry")
const packageroute = require("./route/Package")
const bookingroute = require("./route/Booking")
const Contactroute = require("./route/Contact")
const placeRoutes = require("./route/placeRoute")
require("./dbconfigration");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const StripeRoute = require("./route/StripeRoute");
const payment = require("./model/payment");
const corsOptions = {
  origin: "*", // Allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*', // Allow all headers
  credentials: true,
  optionsSuccessStatus: 200, // for legacy browsers
}
app.use(cors(corsOptions));
app.use(express.json({ limit: '2000mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRoute)
app.use("/stripe", StripeRoute)
app.use("/enquiry", enauiryroute)
app.use("/package", packageroute)
app.use("/booking", bookingroute)
app.use("/contact", Contactroute)
app.use('/place', placeRoutes);

app.get('/api/payments', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const results = await payment.aggregate([
      {
        $project: {
          payment_status: 1,
          year: { $year: '$created_at' },
          month: { $month: '$created_at' }
        }
      },
      {
        $match: {
          year: currentYear  
        }
      },
      {
        $group: {
          _id: {
            year: '$year',
            month: '$month',
            payment_status: '$payment_status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          payment_status: '$_id.payment_status',
          count: 1
        }
      }
    ]);

    // Format the results into the desired data structure
    const months = [
      'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    let formattedData = months.map((month, index) => {
      const monthData = results.filter(row => row.month === index + 1);
      const paymentStatusCount = {
        Failed: 0,
        Successful: 0,
        Pending: 0
      };

      monthData.forEach(data => {
        if (data.payment_status === 'canceled') paymentStatusCount.Failed += data.count;
        if (data.payment_status === 'success') paymentStatusCount.Successful += data.count;
        if (data.payment_status === 'pending') paymentStatusCount.Pending += data.count;
      });

      return {
        name: month,
        Failed: paymentStatusCount.Failed,
        Successful: paymentStatusCount.Successful,
        Pending: paymentStatusCount.Pending
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.error('Error fetching payment data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const PORT = process.env.REACT_APP_SERVER_DOMIN;

app.get("/", (req, res) => {
  res.json({
    msg: 'Okay',
    status: 200,
  });
});

app.listen(PORT, () => console.log("Server is running at port : " + PORT));
