import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {Advertisement} from 'entities/Advertisement/model/types/advertisement';

export const fetchAdvertisementById = createAsyncThunk<
  Advertisement,
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
      const response = await extra.api.get<Advertisement>(
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
