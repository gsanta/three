import axios from 'axios';

const apiInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiInstance;
