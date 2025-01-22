const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/Logger');

exports.getPlaceDetails = catchAsync(
    async (req, res) => {
        const { placeId } = req.params;
        if (!placeId) {
            return res.status(400).json({ error: 'Place ID is required' });
        }
        try {
            const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
            const placeUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;
            const placeResponse = await axios.get(placeUrl);
            if (placeResponse.data.status !== 'OK') {
                throw new Error(placeResponse.data.error_message || 'Failed to fetch place details');
            }
            const placeDetails = placeResponse.data.result;
            const photoUrls = placeDetails.photos ? placeDetails.photos.map(photo => {
                return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`;
            }) : [];
            placeDetails.photoUrls = photoUrls;
            const response = {
                success: true,
                data: placeDetails,
            };
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error:", error); // Log the error for debugging
            logger.error("Error in place controller api:", error)
            return res.status(500).json({ success: false, error: error.message });
        }
    }
);


exports.searchPlaces = catchAsync(
    async (req, res) => {
        const { query } = req.query;
        const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Replace with your actual API key
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            let results = response.data.results;
            results = results.filter(place => place.photos && place.photos.length > 0);
            if (results.length === 0) { return res.status(200).json({ status: false, query: query, data: [], totalResults: 0, message: "No places found with photos" }); }
            res.json({
                status: true,
                query: query,
                data: results,
                totalResults: results.length,
                message: "Find Place "
            });
        } catch (error) {
            res.status(500).send('An error occurred while fetching data');
        }
    }
);

exports.nearbySearch = catchAsync(async (req, res) => {
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
    console.log('Received request body:', req.body);
  
    let requestData;
    try {
      requestData = JSON.parse(req.body.body);  // Parse the stringified body
      console.log("requestData", requestData);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to parse the request body.' });
    }
  
    const { latitude, longitude, radius, type, keyword } = requestData;
  
    // Validate the parsed data
    if (!latitude || !longitude || !radius || !type || !keyword) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }
  
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${latitude},${longitude}`,
          radius,
          type,
          keyword,
          key: API_KEY,
        },
      });
      
      // Return the data in a structured JSON response
      res.json({
        status: true,
        data: response.data.results,
        totalResults: response.data.results.length,
      });
    } catch (error) {
      console.error('Error performing nearby search:', error.response?.data || error.message);
      res.status(500).send('Error performing nearby search');
    }
});

  
  



