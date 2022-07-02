import getCsrfTokenCookie from '@/api/getCsrfTokenCookie';
import axios from 'axios';
import flatten from 'lodash/flatten';
import { camelCaseKeys, snakeCaseKeys } from './changeCase';

const transformRequest = flatten([snakeCaseKeys, axios.defaults.transformRequest || []]);
const transformResponse = flatten([axios.defaults.transformResponse || [], camelCaseKeys]);

const apiInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  transformRequest,
  transformResponse,
});

apiInstance.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      'X-CSRF-TOKEN': getCsrfTokenCookie(),
    },
  };
});

export default apiInstance;
