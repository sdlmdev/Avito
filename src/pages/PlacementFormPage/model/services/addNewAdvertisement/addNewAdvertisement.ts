import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {Advertisement} from 'entities/Advertisement/model/types/advertisement';

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

const filterAdvertisementData = (advertisementData: Advertisement) => {
  const allowedKeys = Object.keys(advertisementData).filter((key) => {
    switch (advertisementData.type) {
      case 'Недвижимость':
        return [
          'name',
          'description',
          'location',
          'type',
          'image',
          'propertyType',
          'area',
          'rooms',
          'price',
        ].includes(key);

      case 'Авто':
        return [
          'name',
          'description',
          'location',
          'type',
          'image',
          'brand',
          'model',
          'year',
          'mileage',
        ].includes(key);

      case 'Услуги':
        return [
          'name',
          'description',
          'location',
          'type',
          'image',
          'serviceType',
          'experience',
          'cost',
          'schedule',
        ].includes(key);

      default:
        return false;
    }
  });

  return Object.fromEntries(
    Object.entries(advertisementData).filter(([key]) =>
      allowedKeys.includes(key),
    ),
  );
};

export const addNewAdvertisement = createAsyncThunk<
  undefined,
  Advertisement,
  ThunkConfig<string>
>(
  'addNewAdvertisement/addNewAdvertisement',
  async (advertisementData, thunkApi) => {
    const {extra, rejectWithValue} = thunkApi;
    const formData = new FormData();
    const filteredData = filterAdvertisementData(advertisementData);
    appendFormData(formData, filteredData);

    try {
      const response = await extra.api.post<Advertisement>('/items', formData);

      if (!response.data) {
        throw new Error();
      }
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
