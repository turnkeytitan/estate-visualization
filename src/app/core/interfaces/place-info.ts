import { propertyType } from './filter';

export interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
  area: number;
  city: string;
  bedrooms: number;
  bathrooms: number;
  parkingAvailable: boolean;
  lat: number;
  lon: number;
  image: string;
  propertyType: propertyType;
}
