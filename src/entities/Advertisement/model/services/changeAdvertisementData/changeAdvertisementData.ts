import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';

import {appendFormData} from 'shared/lib/helpers/helpers';

import {advertisementDetailsActions} from '../../slice/advertisementDetailsSlice';
import {AdvertisementVariant} from '../../types/advertisement';

export const changeAdvertisementData = createAsyncThunk<
  AdvertisementVariant,
  AdvertisementVariant,
  ThunkConfig<string>
>(
  'changeAdvertisementData/changeAdvertisementData',
  async (advertisementData, thunkApi) => {
    const {extra, rejectWithValue, dispatch} = thunkApi;
    const {id} = advertisementData;

    if (!id && id !== 0) {
      throw new Error('');
    }

    const formData = new FormData();
    appendFormData(formData, advertisementData);

    try {
      const response = await extra.api.put<AdvertisementVariant>(
        `/items/${id}`,
        formData,
      );

      if (!response.data) {
        throw new Error();
      }

      dispatch(advertisementDetailsActions.updateArticleDetails(response.data));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
