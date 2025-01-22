const express = require('express');
const router = express.Router();
const { getPlaceDetails, searchPlaces, nearbySearch } = require('../controller/placeController');

// Initialize the router

// Define the route
router.get('/get-place-details/:placeId', getPlaceDetails);

router.get('/get-place', searchPlaces);

router.post('/nearbysearch', nearbySearch);

module.exports = router;
