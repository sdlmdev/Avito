export enum AdvertisementType {
  ALL = 'Все',
  IMMOVABLES = 'Недвижимость',
  AUTOMOBILE = 'Авто',
  SERVICES = 'Услуги',
}

export enum AdvertisementView {
  BIG = 'BIG',
  SMALL = 'SMALL',
}

export const advertisementImmovablesFields = {
  name: 'name',
  description: 'description',
  location: 'location',
  type: 'type',
  image: 'image',
  propertyType: 'propertyType',
  area: 'area',
  rooms: 'rooms',
  price: 'price',
};

export const advertisementAutomobileFields = {
  name: 'name',
  description: 'description',
  location: 'location',
  type: 'type',
  image: 'image',
  brand: 'brand',
  model: 'model',
  year: 'year',
  mileage: 'mileage',
};

export const advertisementServicesFields = {
  name: 'name',
  description: 'description',
  location: 'location',
  type: 'type',
  image: 'image',
  serviceType: 'serviceType',
  experience: 'experience',
  cost: 'cost',
  schedule: 'schedule',
};
