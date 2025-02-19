import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {AdvertisementVariant} from 'entities/Advertisement/model/types/advertisement';

import {appendFormData} from 'shared/lib/helpers/helpers';

import {
  advertisementAutomobileFields,
  advertisementImmovablesFields,
  advertisementServicesFields,
} from '../../consts/advertisementConstants';

const filterAdvertisementData = (advertisementData: AdvertisementVariant) => {
  let allowedKeys: Array<string> = [];

  switch (advertisementData.type) {
    case 'Недвижимость':
      allowedKeys = Object.keys(advertisementImmovablesFields);

      break;

    case 'Авто':
      allowedKeys = Object.keys(advertisementAutomobileFields);

      break;

    case 'Услуги':
      allowedKeys = Object.keys(advertisementServicesFields);

      break;

    default:
      return {};
  }

  return Object.fromEntries(
    Object.entries(advertisementData).filter(([key]) =>
      allowedKeys.includes(key),
    ),
  );
};

export const addNewAdvertisement = createAsyncThunk<
  undefined,
  AdvertisementVariant,
  ThunkConfig<string>
>(
  'addNewAdvertisement/addNewAdvertisement',
  async (advertisementData, thunkApi) => {
    const {extra, rejectWithValue} = thunkApi;
    const formData = new FormData();
    const filteredData = filterAdvertisementData(advertisementData);
    appendFormData(formData, filteredData);

    try {
      const response = await extra.api.post<AdvertisementVariant>(
        '/items',
        formData,
      );

      if (!response.data) {
        throw new Error();
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Ошибка');
    }
  },
);
