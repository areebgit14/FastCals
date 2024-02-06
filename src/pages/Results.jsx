import React from 'react';

function Results(props) {
  const { nearbyRestaurants } = props.location.state;

  return (
    <div className="results-page">
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
  );
}

export default Results;
