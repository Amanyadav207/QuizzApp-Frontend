import axios from 'axios';

const axiosInstance = axios.create({
  // console.log(REACT_APP_BACKEND_URL);
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 100000,
  // console.log(baseURL);
});

export default axiosInstance;
