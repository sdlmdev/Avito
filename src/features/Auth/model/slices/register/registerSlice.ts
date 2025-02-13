import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {register} from '../../../model/services/register/register';
import {RegisterScheme} from '../../types/RegisterScheme';

const initialState: RegisterScheme = {
  username: '',
  password: '',
  isLoading: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {actions: registerActions} = registerSlice;
export const {reducer: registerReducer} = registerSlice;
