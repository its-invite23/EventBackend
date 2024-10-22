const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: ['https://user-event.vercel.app', 'https://admin-event-phi.vercel.app', 'http://localhost:3000'], // Allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*', // Allow all headers
  credentials: true,
  optionsSuccessStatus: 200, // for legacy browsers
}

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight requests for POST routes
app.options("*", cors(corsOptions));

// Other middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes
app.use("/user", require('./route/UserRoute'));
app.use("/enquiry", require('./route/Enquiry'));
app.use("/package", require('./route/Package'));
app.use("/booking", require('./route/Booking'));
app.use("/contact", require('./route/Contact'));

app.get("/", (req, res) => {
  res.json({
    msg: 'Okay',
    status: 200,
  });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
