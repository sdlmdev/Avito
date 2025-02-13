import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {USER_KEY} from 'shared/constants/localstorage';

import {User, UserScheme} from '../types/user';

const initialState: UserScheme = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, {payload}: PayloadAction<User>) => {
      state.authData = payload;
      localStorage.setItem(USER_KEY, JSON.stringify(payload));
    },
    checkAuth: (state) => {
      const user = localStorage.getItem(USER_KEY);

      if (user) {
        state.authData = JSON.parse(user);
      }
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_KEY);
    },
  },
});

export const {actions: userActions} = userSlice;
export const {reducer: userReducer} = userSlice;
