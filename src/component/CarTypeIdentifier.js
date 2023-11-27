//Car Type Identifier
/*This component allows a user to upload an image of a car, sends it to an Azure service for prediction, 
and displays the identified car type based on highest probability of the prediction.*/

import React, { useState } from 'react';
import { fetchDataFromAzure } from './apiService.js'; // Imports the function from azureapi.ts

// These will be used to manage the selected image file, the result of the prediction, and the preview of the selected image.
const CarTypeIdentifier = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

// This sets the image state to the selected file and generates a preview of the image 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); //  prevents the default form submission
    if (image) {       // checks if an image is selected
      const data = await fetchDataFromAzure(image); // calls the function with the selected image.
      if (data.predictions && data.predictions.length > 0) {
        const highestPrediction = data.predictions.reduce((prev, current) => {
          return (prev.probability > current.probability) ? prev : current;
        });
        setResult(highestPrediction); // Upon returning, finds the prediction with the highest probability and sets it as the result.
      }
    }
  };


  return (
    <div className="centered-container">
      <form onSubmit={handleFormSubmit} className="form-container">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Identify Car </button>
      </form>
      {imagePreview && (
        <div className="image-card">
          <img src={imagePreview} alt="Car preview" className="image-preview" />
          {result && (
            <div className="result-container">
              <p>Car Type: {result.tagName}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarTypeIdentifier;