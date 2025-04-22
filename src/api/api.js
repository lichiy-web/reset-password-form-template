import axios from 'axios';

const configAPI = {
  baseURL: 'https://nodejs-hw-mongodb-hw6-email-and-images-58gc.onrender.com',
  timeout: 4000,
};
const api = axios.create(configAPI);

export const resetPassword = creds => api.post('/auth/reset-pwd', creds);
