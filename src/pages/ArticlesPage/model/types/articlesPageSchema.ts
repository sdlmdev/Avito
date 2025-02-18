import {EntityState} from '@reduxjs/toolkit';
import {
  AdvertisementType,
  AdvertisementVariant,
  AdvertisementView,
} from 'entities/Advertisement';

export interface ArticlesPageSchema extends EntityState<AdvertisementVariant> {
  isLoading?: boolean;
  error?: string;
  page: number;
  limit: number;
  maxPage: number;
  view: AdvertisementView;
  search: string;
  type: AdvertisementType;
  propertyType?: string;
  area?: number;
  rooms?: number;
  price?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType?: string;
  experience?: number;
  cost?: number;
  location?: string;

  schedule?: string;

  _inited: boolean;
}
