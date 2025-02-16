import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {AdvertisementType} from 'entities/Advertisement';

import {getArticlesPageInited} from '../../selectors/articlesPageSelectors';
import {articlesPageActions} from '../../slices/articlesPageSlice';
import {fetchArticlesList} from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const {getState, dispatch} = thunkApi;
  const inited = getArticlesPageInited(getState());

  if (!inited) {
    const searchFromUrl = searchParams.get('search');
    const typeFromUrl = searchParams.get('type') as AdvertisementType;

    if (searchFromUrl) {
      dispatch(articlesPageActions.setSearch(searchFromUrl));
    }

    if (typeFromUrl) {
      dispatch(articlesPageActions.setType(typeFromUrl));
    }

    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
