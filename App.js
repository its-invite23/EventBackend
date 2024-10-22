const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://user-event.vercel.app',
      'https://admin-event-phi.vercel.app',
      'http://localhost:3000'
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use CORS middleware before routes
app.use(cors(corsOptions));

// Handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

// Other middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes
app.use("/user", require('./route/UserRoute'));
app.use("/enquiry", require('./route/Enquiry'));
app.use("/package", require('./route/Package'));
app.use("/booking", require('./route/Booking'));
app.use("/contact", require('./route/Contact'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
