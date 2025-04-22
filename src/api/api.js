import axios from 'axios';
import { baseURL, resetPasswordRoute } from './api-config.json';

const configAPI = {
  baseURL,
  timeout: 4000,
};
const api = axios.create(configAPI);

export const resetPassword = creds => api.post(resetPasswordRoute, creds);
