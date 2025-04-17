// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Ajusta esta URL a la de tu backend
});

export default api;
