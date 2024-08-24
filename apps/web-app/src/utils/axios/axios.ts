import Axios from 'axios';
import axiosRetry from 'axios-retry';

const axios = Axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(axios, {
  retries: 30,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  onRetry: (retryCount) => {
    console.log(`Retry #${retryCount}...`);
  },
});

export { axios };
