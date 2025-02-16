import {Advertisement} from './advertisement';

export interface AdvertisementDetailsSchema {
  isLoading: boolean;
  error?: string;
  data: Advertisement;
}
