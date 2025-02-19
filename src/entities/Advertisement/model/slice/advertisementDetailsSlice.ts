import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addNewAdvertisement} from 'entities/Advertisement/model/services/addNewAdvertisement/addNewAdvertisement';
import {changeAdvertisementData} from 'entities/Advertisement/model/services/changeAdvertisementData/changeAdvertisementData';
import {deleteAdvertisement} from 'entities/Advertisement/model/services/deleteAdvertisement/deleteAdvertisement';

import {ADVERTISEMENT_FORM} from 'shared/constants/localstorage';

import {AdvertisementType} from '../consts/advertisementConstants';
import {fetchAdvertisementById} from '../services/fetchAdvertisementById/fetchArticleById';
import {
  AdvertisementTypeAutomobile,
  AdvertisementTypeImmovables,
  AdvertisementTypeService,
  AdvertisementVariant,
} from '../types/advertisement';
import {AdvertisementDetailsSchema} from '../types/articleDetailsSchema';

const defaultState: AdvertisementDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: {
    name: '',
    description: '',
    location: '',
    type: 'Недвижимость',
    image: '',
    id: 0,
    user: {
      username: '',
      id: 0,
    },
    propertyType: 'Квартира',
    area: 1,
    rooms: 1,
    price: 1,
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 1,
    serviceType: 'Консультация',
    experience: 1,
    cost: 1,
    schedule: '',
  },
} as AdvertisementDetailsSchema;

const loadStateFromLocalStorage = () => {
  const serializedState = localStorage.getItem(ADVERTISEMENT_FORM);

  if (!serializedState) {
    return JSON.parse(JSON.stringify(defaultState));
  }

  return JSON.parse(serializedState);
};

const saveStateToLocalStorage = (state: AdvertisementDetailsSchema) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(ADVERTISEMENT_FORM, serializedState);
};

const initialState: AdvertisementDetailsSchema = loadStateFromLocalStorage();

export const advertisementDetailsSlice = createSlice({
  name: 'advertisementDetails',
  initialState,
  reducers: {
    updateArticleDetails(state, action: PayloadAction<AdvertisementVariant>) {
      state.data = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
      saveStateToLocalStorage(state);
    },
    setDescription(state, action: PayloadAction<string>) {
      state.data.description = action.payload;
      saveStateToLocalStorage(state);
    },
    setLocation(state, action: PayloadAction<string>) {
      state.data.location = action.payload;
      saveStateToLocalStorage(state);
    },
    setCategory(state, action: PayloadAction<AdvertisementType>) {
      state.data.type = action.payload;
      saveStateToLocalStorage(state);
    },
    setPropertyType(state, action: PayloadAction<string>) {
      if (state.data.type === AdvertisementType.IMMOVABLES) {
        (state.data as AdvertisementTypeImmovables).propertyType =
          action.payload;

        saveStateToLocalStorage(state);
      }
    },
    setArea(state, action: PayloadAction<number | string>) {
      if (state.data.type === AdvertisementType.IMMOVABLES) {
        (state.data as AdvertisementTypeImmovables).area = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setRooms(state, action: PayloadAction<number | string>) {
      if (state.data.type === AdvertisementType.IMMOVABLES) {
        (state.data as AdvertisementTypeImmovables).rooms = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setPrice(state, action: PayloadAction<number | string>) {
      if (state.data.type === AdvertisementType.IMMOVABLES) {
        (state.data as AdvertisementTypeImmovables).price = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setBrand(state, action: PayloadAction<string>) {
      if (state.data.type === AdvertisementType.AUTOMOBILE) {
        (state.data as AdvertisementTypeAutomobile).brand = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setModel(state, action: PayloadAction<string>) {
      if (state.data.type === AdvertisementType.AUTOMOBILE) {
        (state.data as AdvertisementTypeAutomobile).model = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setYear(state, action: PayloadAction<number | string>) {
      if (state.data.type === AdvertisementType.AUTOMOBILE) {
        (state.data as AdvertisementTypeAutomobile).year = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setMileage(state, action: PayloadAction<number | string>) {
      if (state.data.type === AdvertisementType.AUTOMOBILE) {
        (state.data as AdvertisementTypeAutomobile).mileage = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setServiceType(state, action: PayloadAction<string>) {
      if (state.data.type === AdvertisementType.SERVICES) {
        (state.data as AdvertisementTypeService).serviceType = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setExperience(state, action: PayloadAction<number | string>) {
      if (state.data.type === AdvertisementType.SERVICES) {
        (state.data as AdvertisementTypeService).experience = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setCost(state, action: PayloadAction<number | string>) {
      if (state.data.type === AdvertisementType.SERVICES) {
        (state.data as AdvertisementTypeService).cost = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setSchedule(state, action: PayloadAction<string>) {
      if (state.data.type === AdvertisementType.SERVICES) {
        (state.data as AdvertisementTypeService).schedule = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    setImage(state, action: PayloadAction<File>) {
      if (state.data) {
        state.data.image = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    resetAdvertisementForm(state) {
      state.data = JSON.parse(JSON.stringify(defaultState.data));
      saveStateToLocalStorage(defaultState);
    },
    reInitState(state) {
      state.data = loadStateFromLocalStorage().data;
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
        (state, action: PayloadAction<AdvertisementVariant>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = undefined;
        },
      )
      .addCase(fetchAdvertisementById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changeAdvertisementData.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(changeAdvertisementData.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(changeAdvertisementData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addNewAdvertisement.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addNewAdvertisement.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(addNewAdvertisement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdvertisement.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteAdvertisement.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(deleteAdvertisement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {actions: advertisementDetailsActions} = advertisementDetailsSlice;
export const {reducer: advertisementDetailsReducer} = advertisementDetailsSlice;
