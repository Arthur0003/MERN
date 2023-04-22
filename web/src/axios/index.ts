import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8000/';

export const Axios = axios.create({
  baseURL: 'http://localhost:8000/',
});
