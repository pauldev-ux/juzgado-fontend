// src/services/api.js
/*import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Ajusta esta URL a la de tu backend
});

export default api;

*/
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL  // en lugar de la URL fija
});

export default API;
