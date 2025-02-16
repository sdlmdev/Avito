import {StateScheme} from 'app/providers/StoreProvider';

export const getAdvertisementDetailsData = (state: StateScheme) =>
  state.advertisementDetails?.data;
export const getAdvertisementDetailsIsLoading = (state: StateScheme) =>
  state.advertisementDetails?.isLoading || false;
export const getAdvertisementDetailsError = (state: StateScheme) =>
  state.advertisementDetails?.error;
