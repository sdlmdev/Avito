import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';

import {AdvertisementVariant} from '../../types/advertisement';

export const fetchAdvertisementById = createAsyncThunk<
  AdvertisementVariant,
  string | undefined,
  ThunkConfig<string>
>(
  'advertisementDetails/fetchAdvertisementById',
  async (advertisementId, thunkApi) => {
    const {extra, rejectWithValue} = thunkApi;

    if (!advertisementId) {
      throw new Error('');
    }

    try {
      const response = await extra.api.get<AdvertisementVariant>(
        `/items/${advertisementId}`,
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
