import axios from 'axios';

import {USER_KEY} from 'shared/constants/localstorage';

export const $api = axios.create({
  baseURL: __API__,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    const user = localStorage.getItem(USER_KEY);
    const token = user ? JSON.parse(user).token : '';

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
