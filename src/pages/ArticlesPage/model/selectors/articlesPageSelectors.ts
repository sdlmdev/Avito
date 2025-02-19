import {StateScheme} from 'app/providers/StoreProvider';
import {AdvertisementType, AdvertisementView} from 'entities/Advertisement';

export const getArticlesData = (state: StateScheme) =>
  state.advertisementDetails;
export const getArticlesPageIsLoading = (state: StateScheme) =>
  state.advertisementsPage?.isLoading || false;
export const getArticlesPageError = (state: StateScheme) =>
  state.advertisementsPage?.error;
export const getArticlesPageView = (state: StateScheme) =>
  state.advertisementsPage?.view || AdvertisementView.SMALL;
export const getArticlesPageNum = (state: StateScheme) =>
  state.advertisementsPage?.page || 1;
export const getArticlesPageLimit = (state: StateScheme) =>
  state.advertisementsPage?.limit || 5;
export const getArticlesPageSearch = (state: StateScheme) =>
  state.advertisementsPage?.search ?? '';
export const getArticlesPageType = (state: StateScheme) =>
  state.advertisementsPage?.type ?? AdvertisementType.ALL;
export const getArticlesPagePropertyType = (state: StateScheme) =>
  state.advertisementsPage?.propertyType ?? '';
export const getArticlesPageArea = (state: StateScheme) =>
  state.advertisementsPage?.area ?? 0;
export const getArticlesPageRooms = (state: StateScheme) =>
  state.advertisementsPage?.rooms ?? 0;
export const getArticlesPagePrice = (state: StateScheme) =>
  state.advertisementsPage?.price ?? 0;
export const getArticlesPageBrand = (state: StateScheme) =>
  state.advertisementsPage?.brand ?? '';
export const getArticlesPageModel = (state: StateScheme) =>
  state.advertisementsPage?.model ?? '';
export const getArticlesPageYear = (state: StateScheme) =>
  state.advertisementsPage?.year ?? 0;
export const getArticlesPageMileage = (state: StateScheme) =>
  state.advertisementsPage?.mileage ?? 0;
export const getArticlesPageServiceType = (state: StateScheme) =>
  state.advertisementsPage?.serviceType ?? '';
export const getArticlesPageExperience = (state: StateScheme) =>
  state.advertisementsPage?.experience ?? 0;
export const getArticlesPageCost = (state: StateScheme) =>
  state.advertisementsPage?.cost ?? 0;
export const getArticlesPageLocation = (state: StateScheme) =>
  state.advertisementsPage?.location ?? '';
export const getArticlesPageMaxPage = (state: StateScheme) =>
  state.advertisementsPage?.maxPage || 1;
