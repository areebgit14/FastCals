// Results.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import './Results.css';

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}


function Results() {
  const { caloriesNeeded, proteinNeeded } = useParams();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [moveLeft, setMoveLeft] = useState(false);
  const apiKey = 'AIzaSyAE7jbNly4VYg35IaEa2gALlDt0SyRHfkw';


  useEffect(() => {
    async function fetchLocation() {
      try {
        const position = await getCurrentPosition();
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(userLocation);
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.latitude},${userLocation.longitude}&key=${apiKey}`
        );
        setAddress(response.data.results);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }

    fetchLocation();
  }, []); // Empty dependency array to run the effect only once
  
  useEffect(() => {
    async function fetchNearbyRestaurants() {
      if (!location) return; // Ensure location is available before making the request
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=10000&type=restaurant&keyword=fast%20food&key=${apiKey}`
        );

        setNearbyRestaurants(response.data.results);
      } catch (apiError) {
        console.error('Error fetching nearby restaurants:', apiError);
      }
    }

    fetchNearbyRestaurants();
  }, [location]); // Run the effect when location changes

  const handleRestaurantClick = (restaurant) => {
    console.log('Restaurant clicked:', restaurant);
    if (selectedRestaurant === restaurant) {
      setSelectedRestaurant(null);
      setMoveLeft(false); // Bring everything back to the middle
    } else {
      setSelectedRestaurant(restaurant);
      setMoveLeft(true); // Move nearby restaurants to the left
    }
  };

  return (
    <div className="results-container">
      <p className="intro-text">We've found you some great options for your calorie and protein goals near:</p>
      <p className="address-text">{address.length > 0 && address[0].formatted_address}</p>
      <h2 className="heading">Nearby Restaurants:</h2>
      <div className={`layout-container ${moveLeft ? 'move-left' : ''}`}>
        <div className="nearby-restaurants">
          <div className="restaurant-list">
            {nearbyRestaurants.map((place, index) => (
              <div key={index} className="restaurant-item" onClick={() => handleRestaurantClick(place)}>
                <div className="restaurant-box">
                  <img src={place.icon} alt={place.name} className="restaurant-logo" />
                  <div className="restaurant-info">
                    <p className="restaurant-name">{place.name}</p>
                    <p className="restaurant-rating">Rating: {place.rating}</p>
                    <p className="restaurant-address">Address: {place.vicinity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedRestaurant && (
          <div className={`selected-restaurant ${moveLeft ? 'move-left' : ''}`}>
            <h2 className="selected-heading">{selectedRestaurant.name}</h2>
            <p className="selected-address">Address: {selectedRestaurant.vicinity}</p>
            {/* Add menu and other restaurant information here */}
          </div>
        )}
      </div>
    </div>
  );
}
export default Results;