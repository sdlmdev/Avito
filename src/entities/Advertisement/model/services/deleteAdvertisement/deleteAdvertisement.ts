import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';

export const deleteAdvertisement = createAsyncThunk<
  string,
  string | number,
  ThunkConfig<string>
>(
  'deleteAdvertisement/deleteAdvertisement',
  async (advertisementId, thunkApi) => {
    const {extra, rejectWithValue} = thunkApi;

    if (!advertisementId) {
      throw new Error('');
    }

    try {
      const response = await extra.api.delete(`/items/${advertisementId}`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
