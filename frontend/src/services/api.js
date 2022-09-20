import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    token: localStorage.getItem('accessToken')
  }
})

export default api;