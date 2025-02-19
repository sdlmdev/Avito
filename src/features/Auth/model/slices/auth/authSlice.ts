import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {register} from 'features/Auth/model/services/register/register';

import {login} from '../../services/login/login';
import {AuthScheme} from '../../types/authScheme';

const initialState: AuthScheme = {
  username: '',
  password: '',
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetState: (state) => {
      state.username = '';
      state.password = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {actions: authActions} = authSlice;
export const {reducer: authReducer} = authSlice;
