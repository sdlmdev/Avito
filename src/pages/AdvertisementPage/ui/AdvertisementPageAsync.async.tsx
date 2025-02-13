import {lazy} from 'react';

export const AdvertisementPageAsync = lazy(
  async () => import('./AdvertisementPage'),
);
