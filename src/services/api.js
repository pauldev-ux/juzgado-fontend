// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Ajusta esta URL a la de tu backend
});

export default api;

/*
// src/services/api.js
// src/services/api.js
import axios from 'axios';

// En Vite import.meta.env.MODE === 'development' para local
// y 'production' cuando haces build.
const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3001/api'
    : 'https://juzgado-backend-production.up.railway.app/api';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,    // si necesitas cookies, tokens por cookie, etc.
});

export default API;
*/

