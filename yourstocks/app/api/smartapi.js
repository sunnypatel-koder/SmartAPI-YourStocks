// pages/api/smartapi.js
import axios from 'axios';

export default async function handler(req, res) {
  // Replace with your actual endpoint and parameters
  const endpoint = 'https://api.angelone.in/v1/orders'; // Example endpoint
  const apiKey = 'eWANLAZo';
  const secretKey = '8a717bde-2d87-4777-88c7-17dbfd92d0e4';

  try {
    // Example API call (you might need to adjust headers and params based on the actual API documentation)
    const response = await axios.get(endpoint, {
      headers: {
        'X-API-KEY': apiKey,
        'X-SECRET-KEY': secretKey,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Smart API' });
  }
}
