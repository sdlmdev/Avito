import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {AdvertisementType} from 'entities/Advertisement';
import {
  advertisementAutomobileFields,
  advertisementImmovablesFields,
  advertisementServicesFields,
} from 'entities/Advertisement/model/consts/advertisementConstants';

import {articlesPageActions} from '../../slices/articlesPageSlice';
import {fetchArticlesList} from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const {dispatch} = thunkApi;

  const searchFromUrl = searchParams.get('search');
  const pageFromUrl = searchParams.get('page');
  const roomsFromUrl = searchParams.get(advertisementImmovablesFields.rooms);
  const priceFromUrl = searchParams.get(advertisementImmovablesFields.price);
  const brandFromUrl = searchParams.get(advertisementAutomobileFields.brand);
  const modelFromUrl = searchParams.get(advertisementAutomobileFields.model);
  const yearFromUrl = searchParams.get(advertisementAutomobileFields.year);
  const costFromUrl = searchParams.get(advertisementServicesFields.cost);
  const areaFromUrl = searchParams.get(advertisementImmovablesFields.area);

  const typeFromUrl = searchParams.get(
    advertisementImmovablesFields.type,
  ) as AdvertisementType;

  const propertyTypeFromUrl = searchParams.get(
    advertisementImmovablesFields.propertyType,
  );

  const mileageFromUrl = searchParams.get(
    advertisementAutomobileFields.mileage,
  );

  const serviceTypeFromUrl = searchParams.get(
    advertisementServicesFields.serviceType,
  );

  const experienceFromUrl = searchParams.get(
    advertisementServicesFields.experience,
  );

  const locationFromUrl = searchParams.get(
    advertisementImmovablesFields.location,
  );

  if (searchFromUrl) {
    dispatch(articlesPageActions.setSearch(searchFromUrl));
  }

  if (typeFromUrl) {
    dispatch(articlesPageActions.setType(typeFromUrl));
  }

  if (pageFromUrl) {
    dispatch(articlesPageActions.setPage(Number(pageFromUrl)));
  }

  if (propertyTypeFromUrl) {
    dispatch(articlesPageActions.setPropertyType(propertyTypeFromUrl));
  }

  if (areaFromUrl) {
    dispatch(articlesPageActions.setArea(Number(areaFromUrl)));
  }

  if (roomsFromUrl) {
    dispatch(articlesPageActions.setRooms(Number(roomsFromUrl)));
  }

  if (priceFromUrl) {
    dispatch(articlesPageActions.setPrice(Number(priceFromUrl)));
  }

  if (brandFromUrl) {
    dispatch(articlesPageActions.setBrand(brandFromUrl));
  }

  if (modelFromUrl) {
    dispatch(articlesPageActions.setModel(modelFromUrl));
  }

  if (yearFromUrl) {
    dispatch(articlesPageActions.setYear(Number(yearFromUrl)));
  }

  if (mileageFromUrl) {
    dispatch(articlesPageActions.setMileage(Number(mileageFromUrl)));
  }

  if (serviceTypeFromUrl) {
    dispatch(articlesPageActions.setServiceType(serviceTypeFromUrl));
  }

  if (experienceFromUrl) {
    dispatch(articlesPageActions.setExperience(Number(experienceFromUrl)));
  }

  if (costFromUrl) {
    dispatch(articlesPageActions.setCost(Number(costFromUrl)));
  }

  if (locationFromUrl) {
    dispatch(articlesPageActions.setLocation(locationFromUrl));
  }

  dispatch(articlesPageActions.initState());
  dispatch(fetchArticlesList({replace: true}));
});
