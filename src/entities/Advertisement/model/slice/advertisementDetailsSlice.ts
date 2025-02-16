import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchAdvertisementById} from 'entities/Advertisement/model/services/fetchAdvertisementById/fetchArticleById';

import {Advertisement} from '../types/article';
import {ArticleDetailsSchema} from '../types/articleDetailsSchema';

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: {
    name: '',
    description: '',
    location: '',
    type: 'Все',
    image: '',
    id: 0,
    user: {
      username: '',
      id: 0,
    },
    propertyType: '',
    area: 0,
    rooms: 0,
    price: 0,
    brand: '',
    model: '',
    year: 0,
    mileage: 0,
    serviceType: '',
    experience: 0,
    cost: 0,
    schedule: '',
  },
} as ArticleDetailsSchema;

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {
    updateArticleDetails(state, action: PayloadAction<Advertisement>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertisementById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAdvertisementById.fulfilled,
        (state, action: PayloadAction<Advertisement>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchAdvertisementById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {actions: articleDetailsActions} = articleDetailsSlice;
export const {reducer: articleDetailsReducer} = articleDetailsSlice;
