import {User} from '../../../User';
import {AdvertisementType} from '../consts/advertisementConstants';

export interface AdvertisementDefault {
  name: string;
  description: string;
  location: string;
  type: AdvertisementType;
  image: string | File | null;
  id: number | string;
  user: User;
}

export interface AdvertisementTypeImmovables extends AdvertisementDefault {
  propertyType: string;
  area: number | string;
  rooms: number | string;
  price: number | string;
}

export interface AdvertisementTypeAutomobile extends AdvertisementDefault {
  brand: string;
  model: string;
  year: number | string;
  mileage: number | string;
}

export interface AdvertisementTypeService extends AdvertisementDefault {
  serviceType: string;
  experience: number | string;
  cost: number | string;
  schedule?: string;
}

export type AdvertisementVariant =
  | AdvertisementTypeImmovables
  | AdvertisementTypeAutomobile
  | AdvertisementTypeService;
