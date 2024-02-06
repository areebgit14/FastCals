import axios from 'axios';

const getNearbyRestaurants = async (apiKey, latitude, longitude, radius = 50000, type = 'fast_food_restaurant') => {
  const apiUrl = 'https://places.googleapis.com/v1/places:searchNearby';

  const requestBody = {
    includedTypes: [type],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude,
          longitude,
        },
        radius,
      },
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'places.displayName',
  };

  try {
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log('API Response:', response.data);
    // Handle the response data as needed
    return response.data;
  } catch (error) {
    console.error('API Error:', error.message);
    // Handle the error as needed
    return [];
  }
};

export default getNearbyRestaurants;
