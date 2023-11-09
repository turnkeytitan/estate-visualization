export type propertyType = 'apartment' | 'house' | '';
export interface Filter {
  city: string | null;
  type: propertyType | null;
  price: {
    max: number | null;
    min: number | null;
  };
  area: {
    max: number | null;
    min: number | null;
  };
}
