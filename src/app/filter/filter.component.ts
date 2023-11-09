import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilterForm, numberGroup } from './interfaces/filter-form';
import { propertyType } from 'app/core/interfaces/filter';
import { ShareDataService } from 'app/core/services/share-data.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  form: FormGroup<FilterForm> = this.fb.group({
    city: [''],
    type: this.fb.control<propertyType>(''),
    price: this.fb.group<numberGroup>({
      max: this.fb.control<number | null>(null),
      min: this.fb.control<number | null>(null),
    }),
    area: this.fb.group({
      max: this.fb.control<number | null>(null),
      min: this.fb.control<number | null>(null),
    }),
  });
  constructor(
    private fb: FormBuilder,
    private shareService: ShareDataService,
  ) {}

  onSubmit() {
    this.shareService.setFilter(this.form.getRawValue());
  }
}
