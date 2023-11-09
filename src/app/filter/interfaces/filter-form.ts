import { FormControl, FormGroup } from '@angular/forms';
import { propertyType } from 'app/core/interfaces/filter';

export interface FilterForm {
  city: FormControl<string | null>;
  type: FormControl<propertyType | null>;
  price: FormGroup<numberGroup>;
  area: FormGroup<numberGroup>;
}

export type numberGroup = {
  max: FormControl<number | null>;
  min: FormControl<number | null>;
};
