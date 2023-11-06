import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { FullInfoComponent } from '../full-info/full-info.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilterComponent, FullInfoComponent, MapComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
