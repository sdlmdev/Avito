import {User} from 'entities/User';

import {AdvertisementType} from '../consts/advertisementConstants';

export interface Article {
  name: string;
  description: string;
  location: string;
  type: AdvertisementType;
  image: string | File | null;
  id: number;
  user: User;
}

export interface AdvertisementTypeImmovables extends Article {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface AdvertisementTypeAutomobile extends Article {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface AdvertisementTypeService extends Article {
  serviceType: string;
  experience: number;
  cost: number;
  schedule?: string;
}

export type Advertisement =
  | AdvertisementTypeImmovables
  | AdvertisementTypeAutomobile
  | AdvertisementTypeService;
