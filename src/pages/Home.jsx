import React, { useState, useEffect } from 'react';
import getNearbyRestaurants from './NearbyRestaurants';

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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          console.log('Submitted inputs:', { ...inputs, userLocation });
          setLocation(userLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
          console.log('Submitted inputs (without location):', inputs);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      console.log('Submitted inputs (without location):', inputs);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        try {
          const restaurants = await getNearbyRestaurants(
            apiKey,
            location.latitude,
            location.longitude
          );
          setNearbyRestaurants(restaurants);
        } catch (error) {
          console.error('Error fetching nearby restaurants:', error);
        }
      }
    };

    fetchData();
  }, [location, apiKey]);

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

      {nearbyRestaurants.length > 0 && (
        <div className="nearby-restaurants">
          <h2>Nearby Restaurants:</h2>
          <ul>
            {nearbyRestaurants.map((place, index) => (
              <li key={index}>
                <pre>{JSON.stringify(place, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
}

export default Home;
