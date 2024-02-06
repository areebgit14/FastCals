// Results.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function Results() {
  const { caloriesNeeded, proteinNeeded } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const position = await getCurrentPosition();
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(userLocation);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }

    fetchLocation();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {location && (
        <div className="location-info">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
}

export default Results;
