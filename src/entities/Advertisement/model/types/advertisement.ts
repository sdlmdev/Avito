import {User} from '../../../User';
import {AdvertisementType} from '../consts/advertisementConstants';

export interface AdvertisementDefault {
  name: string;
  description: string;
  location: string;
  type: AdvertisementType;
  image: string | File | null;
  id: number;
  user: User;
}

export interface AdvertisementTypeImmovables extends AdvertisementDefault {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface AdvertisementTypeAutomobile extends AdvertisementDefault {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface AdvertisementTypeService extends AdvertisementDefault {
  serviceType: string;
  experience: number;
  cost: number;
  schedule?: string;
}

export type Advertisement =
  | AdvertisementTypeImmovables
  | AdvertisementTypeAutomobile
  | AdvertisementTypeService;
