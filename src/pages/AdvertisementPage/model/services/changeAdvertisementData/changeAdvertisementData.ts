import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';

import {advertisementDetailsActions} from '../../slice/advertisementDetailsSlice';
import {Advertisement} from '../../types/advertisement';

const appendFormData = (
  formData: FormData,
  data: any,
  parentKey: string = '',
) => {
  if (data && typeof data === 'object' && !(data instanceof File)) {
    Object.entries(data).forEach(([key, value]) => {
      appendFormData(formData, value, parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    formData.append(parentKey, data);
  }
};

export const changeAdvertisementData = createAsyncThunk<
  Advertisement,
  Advertisement,
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
      const response = await extra.api.put<Advertisement>(
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
