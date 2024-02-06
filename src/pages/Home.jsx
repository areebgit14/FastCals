import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    caloriesNeeded: '',
    proteinNeeded: ''
  });

  async function handleSubmit(event) {
    event.preventDefault();
    navigate(`/results/${inputs.caloriesNeeded}/${inputs.proteinNeeded}`);
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
            <label htmlFor="caloriesNeeded">Calories Needed:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter The Amount Of Calories You Need (cals)"
              onChange={(e) => handleInputChange('caloriesNeeded', e.target.value)}
            />

            <label htmlFor="proteinNeeded">Protein Needed:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter The Amount Of Protein You Need (g)"
              onChange={(e) => handleInputChange('proteinNeeded', e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
