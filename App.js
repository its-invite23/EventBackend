
const dotenv = require("dotenv");
const UserRoute = require("./route/UserRoute")
const enauiryroute = require("./route/Enquiry")
const packageroute = require("./route/Package")
const bookingroute = require("./route/Booking")
const Contactroute = require("./route/Contact")

require("./dbconfigration");
dotenv.config();

const express = require("express"); 
const app = express();
const cors = require("cors");
const StripeRoute = require("./route/StripeRoute");
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





const PORT = process.env.REACT_APP_SERVER_DOMIN;

app.get("/", (req, res) => {
  res.json({
    msg: 'Okay',
    status: 200,
  });
});

app.listen(PORT, () => console.log("Server is running at port : " + PORT));
