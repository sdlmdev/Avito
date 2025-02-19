import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {StateScheme} from 'app/providers/StoreProvider';
import {
  AdvertisementType,
  AdvertisementVariant,
  AdvertisementView,
} from 'entities/Advertisement';

import {ARTICLES_VIEW_LOCALSTORAGE_KEY} from 'shared/constants/localstorage';

import {ArticlesPageSchema} from '../types/articlesPageSchema';
import {fetchArticlesList} from './../services/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<AdvertisementVariant>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateScheme>(
  (state) => state.advertisementsPage || articlesAdapter.getInitialState(),
);

const initialState = articlesAdapter.getInitialState<ArticlesPageSchema>({
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
  view: AdvertisementView.SMALL,
  page: 1,
  limit: 5,
  search: '',
  type: AdvertisementType.ALL,
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
  location: '',
  maxPage: 1,
  // schedule: '',
});

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<AdvertisementView>) => {
      state.view = action.payload;

      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setType: (state, action: PayloadAction<AdvertisementType>) => {
      state.type = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPropertyType: (state, action: PayloadAction<string>) => {
      state.propertyType = action.payload;
    },
    setArea: (state, action: PayloadAction<number>) => {
      state.area = action.payload;
    },
    setRooms: (state, action: PayloadAction<number>) => {
      state.rooms = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setMileage: (state, action: PayloadAction<number>) => {
      state.mileage = action.payload;
    },
    setServiceType: (state, action: PayloadAction<string>) => {
      state.serviceType = action.payload;
    },
    setExperience: (state, action: PayloadAction<number>) => {
      state.experience = action.payload;
    },
    setCost: (state, action: PayloadAction<number>) => {
      state.cost = action.payload;
    },
    // setSchedule: (state, action: PayloadAction<string>) => {
    //   state.schedule = action.payload;
    // },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setMaxPage: (state, action: PayloadAction<number>) => {
      state.maxPage = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY,
      ) as AdvertisementView;

      state.view = view;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {reducer: articlesPageReducer, actions: articlesPageActions} =
  articlesPageSlice;
