import axios from 'axios';

import {USER_KEY} from 'shared/constants/localstorage';

export const $api = axios.create({
  baseURL: __API__,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem(USER_KEY) || '';
  }

  return config;
});
