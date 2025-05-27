const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://blog-server-json.onrender.com'  // Replace with your deployed JSON server URL
  : 'http://localhost:8000';

export default API_URL; 