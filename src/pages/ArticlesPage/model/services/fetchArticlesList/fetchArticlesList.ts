import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {AxiosResponse} from 'axios';
import {AdvertisementType, AdvertisementVariant} from 'entities/Advertisement';

import {
  addQueryParams,
  clearQueryParams,
} from 'shared/lib/url/changeQueryParams/changeQueryParams';

import {
  getArticlesPageArea,
  getArticlesPageBrand,
  getArticlesPageCost,
  getArticlesPageExperience,
  getArticlesPageLimit,
  getArticlesPageLocation,
  getArticlesPageMileage,
  getArticlesPageModel,
  getArticlesPageNum,
  getArticlesPagePrice,
  getArticlesPagePropertyType,
  getArticlesPageRooms,
  getArticlesPageSearch,
  getArticlesPageServiceType,
  getArticlesPageType,
  getArticlesPageYear,
} from '../../selectors/articlesPageSelectors';
import {articlesPageActions} from '../../slices/articlesPageSlice';

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Array<AdvertisementVariant>,
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
  const {extra, rejectWithValue, getState, dispatch} = thunkApi;
  const limit = getArticlesPageLimit(getState());
  const search = getArticlesPageSearch(getState());
  const page = getArticlesPageNum(getState());
  const type = getArticlesPageType(getState());
  const propertyType = getArticlesPagePropertyType(getState());
  const area = getArticlesPageArea(getState());
  const rooms = getArticlesPageRooms(getState());
  const price = getArticlesPagePrice(getState());
  const brand = getArticlesPageBrand(getState());
  const model = getArticlesPageModel(getState());
  const year = getArticlesPageYear(getState());
  const mileage = getArticlesPageMileage(getState());
  const serviceType = getArticlesPageServiceType(getState());
  const experience = getArticlesPageExperience(getState());
  const cost = getArticlesPageCost(getState());
  const location = getArticlesPageLocation(getState());

  try {
    clearQueryParams();

    const queryParams: Record<string, string> = {
      search,
      type,
      location,
    };

    switch (type) {
      case AdvertisementType.IMMOVABLES:
        queryParams.propertyType = propertyType;
        queryParams.area = String(area);
        queryParams.rooms = String(rooms);
        queryParams.price = String(price);

        break;

      case AdvertisementType.AUTOMOBILE:
        queryParams.brand = brand;
        queryParams.model = model;
        queryParams.year = String(year);
        queryParams.mileage = String(mileage);

        break;

      case AdvertisementType.SERVICES:
        queryParams.serviceType = serviceType;
        queryParams.experience = String(experience);
        queryParams.cost = String(cost);

        break;

      default:
        break;
    }

    addQueryParams(queryParams);

    interface AdvertisementItems {
      items: Array<AdvertisementVariant>;
      maxPage: number;
      currentPage: number;
    }

    const response: AxiosResponse<AdvertisementItems> = await extra.api.get(
      '/items',
      {
        params: {
          limit,
          page,
          ...queryParams,
        },
      },
    );

    if (!response.data) {
      throw new Error();
    }

    const {items, maxPage, currentPage} = response.data;

    dispatch(articlesPageActions.setMaxPage(maxPage));
    dispatch(articlesPageActions.setPage(currentPage));

    return items;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
