const dotenv = require("dotenv");
const UserRoute = require("./route/UserRoute");
const enquiryroute = require("./route/Enquiry");
const packageroute = require("./route/Package");
const bookingroute = require("./route/Booking");
const Contactroute = require("./route/Contact");

require("./dbconfigration");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://user-event.vercel.app',
      'https://admin-event-phi.vercel.app',
      'http://localhost:3000'
    ];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Handle pre-flight requests
app.options('*', cors(corsOptions));

// JSON body and URL-encoded body handling
app.use(express.json({ limit: '2000mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/user", UserRoute);
app.use("/enquiry", enquiryroute);
app.use("/package", packageroute);
app.use("/booking", bookingroute);
app.use("/contact", Contactroute);

// Check server port
const PORT = process.env.SERVER_DOMIN || 5000;

app.get("/", (req, res) => {
  res.json({
    msg: 'Okay',
    status: 200,
  });
});

app.listen(PORT, () => console.log("Server is running at port : " + PORT));
