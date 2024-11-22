const axios = require('axios');

// Replace with your actual Google Places API key
const API_KEY = 'YOUR_GOOGLE_API_KEY';

// Model to fetch place details from the Google Places API
const fetchPlaceDetails = async (placeId) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58`;

    const response = await axios.get(url);

    if (response.data.status === "OK") {
      return response.data.result; // Return the place details
    } else {
      throw new Error(`Error: ${response.data.status} - ${response.data.error_message}`);
    }
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    throw error;
  }
};

module.exports = { fetchPlaceDetails };
