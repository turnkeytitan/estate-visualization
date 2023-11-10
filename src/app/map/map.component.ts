import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { PropertyService } from './services/property.service';
import { HttpClient } from '@angular/common/http';
import { Filter } from 'app/core/interfaces/filter';
import { ShareDataService } from 'app/core/services/share-data.service';
import { Property } from 'app/core/interfaces/place-info';
import { MapInteractionService } from './services/map-interaction.service';
import { LoadingService } from 'app/core/services/loading.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  providers: [PropertyService, HttpClient],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  map!: mapboxgl.Map;
  properties$: Subscription = EMPTY_SUBSCRIPTION;
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  filter$: Subscription = EMPTY_SUBSCRIPTION;
  filter: Partial<Filter> = {};

  constructor(
    private propertyService: PropertyService,
    private sharedService: ShareDataService,
    private mapService: MapInteractionService,
    private loading: LoadingService,
  ) {}

  ngOnDestroy(): void {
    this.properties$.unsubscribe();
    this.filter$.unsubscribe();
  }

  ngOnInit(): void {
    this.loading.showLoader();
    this.map = this.mapService.getMap();
    this.filter$ = this.sharedService.filter.subscribe({
      next: this.handleFilter.bind(this),
    });
    this.map.on('load', this.getProperties.bind(this));
  }

  getProperties() {
    this.properties$ = this.propertyService.getProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.handleFilter(null);
        this.loading.hideLoader();
      },
    });
  }

  handleFilter(filter: Filter | null) {
    this.mapService.deletePlaces(this.map);
    this.filteredProperties = this.propertyService.filterProperties(
      this.properties,
      filter,
    );
    this.showPlaces();
  }

  showPlaces() {
    this.filteredProperties.forEach((property) => {
      this.mapService.setMarker(property, this.map);
      this.mapService.addTooltip(property, this.map);
    });
  }
}
