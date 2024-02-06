// Results.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 

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


  return (
    <div>
      <p>{address.length > 0 && address[0].formatted_address}</p>
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
    
  );
}

export default Results;
