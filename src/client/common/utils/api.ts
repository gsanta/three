import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use((request) => {
  if (request.headers) {
    request.headers['X-CSRF-TOKEN'] = Cookies.get('X-CSRF-Token') || '';
  }
  return request;
});

export default api;
