import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {AdvertisementType} from 'entities/Advertisement';

import {articlesPageActions} from '../../slices/articlesPageSlice';
import {fetchArticlesList} from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const {dispatch} = thunkApi;

  const searchFromUrl = searchParams.get('search');
  const typeFromUrl = searchParams.get('type') as AdvertisementType;
  const pageFromUrl = searchParams.get('page');
  const propertyTypeFromUrl = searchParams.get('propertyType');
  const roomsFromUrl = searchParams.get('rooms');
  const priceFromUrl = searchParams.get('price');
  const brandFromUrl = searchParams.get('brand');
  const modelFromUrl = searchParams.get('model');
  const yearFromUrl = searchParams.get('year');
  const mileageFromUrl = searchParams.get('mileage');
  const serviceTypeFromUrl = searchParams.get('serviceType');
  const experienceFromUrl = searchParams.get('experience');
  const costFromUrl = searchParams.get('cost');
  const locationFromUrl = searchParams.get('location');
  const areaFromUrl = searchParams.get('area');

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
  dispatch(fetchArticlesList({}));
});
