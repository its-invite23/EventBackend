const express = require('express');
const { getPlaceDetails } = require('../controller/placeController');

// Initialize the router
const router = express.Router();

// Define the route
router.get('/get-place-details/:placeId', getPlaceDetails);

module.exports = router;
