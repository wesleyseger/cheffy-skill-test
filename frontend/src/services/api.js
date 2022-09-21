import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rbt.psi.br:4000',
})

export default api;