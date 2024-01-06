// pages/api/get-jwt-token.js
import { Embedded } from 'alloy-node';

const YOUR_API_KEY = process.env.ALLOY_API_KEY;
const userId = process.env.ALLOY_USER_ID;

export default async function handler(req, res) {
  try {
    const apiClient = new Embedded(YOUR_API_KEY);
    await apiClient.identify(userId);
    let data = await apiClient.get();

    res.status(200).json({ token: data.token });
  } catch (error) {
    console.error('Error generating JWT token:', error);
    res.status(500).json({ error: 'Error generating JWT token' });
  }
}
