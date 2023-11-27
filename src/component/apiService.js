//Azure Custom Vision API
/*This component takes an image file as input, prepares the data, makes a POST request to an 
Azure Custom Vision endpoint, and returns the prediction data from the server. */ 

import axios from 'axios';//Import Axios library

// Function to upload image and get prediction from Azure
export const fetchDataFromAzure = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile); // The backend expects the file with the key 'file'

  const config = {
    headers: {
      'Prediction-Key': '6069c4165cb44299b658aee370c26755', // Use environment variable
      'Content-Type': 'application/octet-stream'
    },
  };

  try {
    const response = await axios.post(
    'https://mission2apicustom-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/65632a25-9f3b-44c6-9208-7993bb07906c/classify/iterations/Iteration2/image', // Use environment variable for endpoint
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Azure:', error);
    throw error;
  }
};