import axios from 'axios';

// Default API URL
const defaultApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default, will be updated after config loads
const api = axios.create({
  baseURL: defaultApiUrl,
  withCredentials: true
});

// Load configuration dynamically
async function loadConfig() {
  try {
    // First, try current backend (for local dev or when already configured)
    const response = await axios.get(`${defaultApiUrl}/config.json`, { timeout: 2000 });
    if (response.data?.API_URL) {
      api.defaults.baseURL = response.data.API_URL;
      console.log(`✓ Loaded API URL from backend: ${response.data.API_URL}`);
      return;
    }
  } catch (err) {
    console.log(`Backend config not available, using default: ${defaultApiUrl}`);
  }
}

// Load config immediately
loadConfig();

console.log(`🔗 API URL initialized: ${api.defaults.baseURL}`);

export default api;
