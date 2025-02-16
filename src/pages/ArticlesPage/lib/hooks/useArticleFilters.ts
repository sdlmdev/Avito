import {AdvertisementType, AdvertisementView} from 'entities/Advertisement';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useDebounce} from 'shared/lib/hooks/useDebounce/useDebounce';

import {
  getArticlesPageArea,
  getArticlesPageBrand,
  getArticlesPageCost,
  getArticlesPageExperience,
  getArticlesPageLocation,
  getArticlesPageMileage,
  getArticlesPageModel,
  getArticlesPagePrice,
  getArticlesPagePropertyType,
  getArticlesPageRooms,
  getArticlesPageSearch,
  getArticlesPageServiceType,
  getArticlesPageType,
  getArticlesPageView,
  getArticlesPageYear,
} from '../../model/selectors/articlesPageSelectors';
import {fetchArticlesList} from '../../model/services/fetchArticlesList/fetchArticlesList';
import {articlesPageActions} from '../../model/slices/articlesPageSlice';

export const useArticleFilters = () => {
  const view = useSelector(getArticlesPageView);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);
  const propertyType = useSelector(getArticlesPagePropertyType);
  const area = useSelector(getArticlesPageArea);
  const rooms = useSelector(getArticlesPageRooms);
  const price = useSelector(getArticlesPagePrice);
  const brand = useSelector(getArticlesPageBrand);
  const model = useSelector(getArticlesPageModel);
  const year = useSelector(getArticlesPageYear);
  const mileage = useSelector(getArticlesPageMileage);
  const serviceType = useSelector(getArticlesPageServiceType);
  const experience = useSelector(getArticlesPageExperience);
  const cost = useSelector(getArticlesPageCost);
  const location = useSelector(getArticlesPageLocation);
  // const schedule = useSelector(getArticlesPageServiceType);

  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({replace: true}));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: AdvertisementView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeType = useCallback(
    (value: AdvertisementType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangePropertyType = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setPropertyType(value));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeArea = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setArea(Number(value)));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeRooms = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setRooms(Number(value)));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangePrice = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setPrice(Number(value)));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeBrand = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setBrand(value));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeModel = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setModel(value));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeYear = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setYear(Number(value)));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeMileage = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setMileage(Number(value)));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeServiceType = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setServiceType(value));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeExperience = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setExperience(Number(value)));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeCost = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setCost(Number(value)));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  // const onChangeSchedule = useCallback(
  //   (value: string) => {
  //     dispatch(articlesPageActions.setSchedule(value));
  //     dispatch(articlesPageActions.setPage(1));
  //     debouncedFetchData();
  //   },
  //   [dispatch, debouncedFetchData],
  // );

  const onChangeLocation = useCallback(
    (value: string) => {
      dispatch(articlesPageActions.setLocation(value));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  return {
    view,
    search,
    type,
    propertyType,
    area,
    rooms,
    price,
    brand,
    model,
    year,
    mileage,
    serviceType,
    experience,
    cost,
    location,
    // schedule,
    onChangeView,
    onChangeSearch,
    onChangeType,
    onChangePropertyType,
    onChangeArea,
    onChangeRooms,
    onChangePrice,
    onChangeBrand,
    onChangeModel,
    onChangeYear,
    onChangeMileage,
    onChangeServiceType,
    onChangeExperience,
    onChangeCost,
    // onChangeSchedule,
    onChangeLocation,
  };
};
