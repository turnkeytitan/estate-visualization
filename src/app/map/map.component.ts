import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment.development';
import { LngLatLike, Map, Marker } from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { MapService } from './services/map.service';
import { HttpClient } from '@angular/common/http';
import { Filter } from 'app/core/interfaces/filter';
import { ShareDataService } from 'app/core/services/share-data.service';
import { Property } from 'app/core/interfaces/place-info';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  providers: [MapService, HttpClient],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  properties$: Subscription = EMPTY_SUBSCRIPTION;
  properties: Property[] = [];
  markers: Marker[] = [];
  filter$: Subscription = EMPTY_SUBSCRIPTION;
  filter: Partial<Filter> = {};

  constructor(
    private mapService: MapService,
    private sharedService: ShareDataService,
  ) {}

  ngOnInit(): void {
    this.setMap();
    this.filter$ = this.sharedService.filter.subscribe({
      next: (filter) => (this.filter = filter),
    });
    this.getProperties();
  }

  getProperties() {
    this.properties$ = this.mapService.getProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
      },
    });
  }

  filterProps() {
    return '';
  }

  setMarker(latLon: LngLatLike) {
    const el = document.createElement('div');
    el.className = 'marker';
    const marker = new Marker(el);
    marker.setLngLat(latLon);
    marker.addTo(this.map);
    this.markers.push(marker);
  }

  setMap() {
    this.map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
      accessToken: environment.mbKey,
    });
  }
}
