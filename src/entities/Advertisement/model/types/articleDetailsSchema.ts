import {AdvertisementVariant} from './advertisement';

export interface AdvertisementDetailsSchema {
  isLoading: boolean;
  error?: string;
  data: AdvertisementVariant;
}
