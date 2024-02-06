import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function Home() {
  const [inputs, setInputs] = useState({
    currentCalories: '',
    calorieGoals: '',
    currentProtein: '',
    proteinGoals: '',
  });

  const [location, setLocation] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const apiKey = 'AIzaSyAE7jbNly4VYg35IaEa2gALlDt0SyRHfkw';

  async function handleSubmit(event) {
    event.preventDefault();
  
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
  
        console.log('Submitted inputs:', { ...inputs, userLocation });
        setLocation(userLocation);
  
        // Now, make the API call to fetch nearby restaurants
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},${userLocation.longitude}&radius=1500&type=restaurant&key=${apiKey}`
          );
  
          setNearbyRestaurants(response.data.results);
        } catch (apiError) {
          console.error('Error fetching nearby restaurants:', apiError);
        }
      } catch (error) {
        console.error('Error getting location:', error);
        console.log('Submitted inputs (without location):', inputs);
      }
    } else {
      console.error('Geolocation is not supported by this browser.');
      console.log('Submitted inputs (without location):', inputs);
    }
  }

  const handleInputChange = (fieldName, value) => {
    setInputs((prevInputs) => ({ ...prevInputs, [fieldName]: value }));
  };

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">FastCals</h1>
          <p>Your macro goals, Fast.</p>
        </div>
      </div>
      <div className="container-page">
        <form onSubmit={handleSubmit}>
          <div className="macro-inputs">
            <label htmlFor="currentCalories">Current Calories:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Calories So Far Today"
              onChange={(e) => handleInputChange('currentCalories', e.target.value)}
            />

            <label htmlFor="calorieGoals">Calorie Goal:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Calorie Goal"
              onChange={(e) => handleInputChange('calorieGoals', e.target.value)}
            />

            <label htmlFor="currentProtein">Current Protein:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Protein So Far Today"
              onChange={(e) => handleInputChange('currentProtein', e.target.value)}
            />

            <label htmlFor="proteinGoals">Protein Goal:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Protein Goal"
              onChange={(e) => handleInputChange('proteinGoals', e.target.value)}
            />

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        {location && (
          <div className="location-info">
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )}
          <div className="nearby-restaurants">
            <h2>Nearby Restaurants:</h2>
            <ul>
              {nearbyRestaurants.map((place, index) => (
                <li key={index}>
                  <p>{place.name}</p>
                  <p>Rating: {place.rating}</p>
                  <p>Address: {place.vicinity}</p>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
}

export default Home;
