const express = require('express');
const { getPlaceDetails } = require('../controller/placeController');

// Initialize the router
const router = express.Router();

// Define the route
router.post('/get-place-details', getPlaceDetails);

module.exports = router;
