import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment.development';
import { Map, Marker, Popup } from 'mapbox-gl';
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
  filteredProperties: Property[] = [];
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
      next: this.handleFilter.bind(this),
    });
    this.getProperties();
  }

  getProperties() {
    this.properties$ = this.mapService.getProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.handleFilter(null);
      },
    });
  }

  handleFilter(filter: Filter | null) {
    this.deletePlaces();
    console.log('filter');
    if (!filter) {
      this.filteredProperties = [...this.properties];
    } else {
      this.filteredProperties = this.properties.filter((property) => {
        if (filter.city && property.city !== filter.city) {
          return false;
        }
        if (filter.type && property.propertyType !== filter.type) {
          return false;
        }
        if (filter.price.min && property.price < filter.price.min) {
          return false;
        }
        if (filter.price.max && property.price > filter.price.max) {
          return false;
        }
        if (filter.area.min && property.area < filter.area.min) {
          return false;
        }
        if (filter.area.max && property.area > filter.area.max) {
          return false;
        }
        return true;
      });
    }
    this.showPlaces();
  }

  showPlaces() {
    this.filteredProperties.forEach((property) => {
      this.setMarker(property);
    });
  }

  deletePlaces() {
    this.markers.forEach((marker) => {
      marker.remove();
    });
    if (this.map.isStyleLoaded()) {
      const existingLayers = this.map.getStyle().layers;
      existingLayers.forEach((layer) => {
        if (layer.id.includes('place')) {
          this.map.removeLayer(layer.id);
        }
      });
      const existingSources = this.map.getStyle().sources;
      Object.keys(existingSources).forEach((sourceId) => {
        if (sourceId.includes('place')) {
          this.map.removeSource(sourceId);
        }
      });
    }
    this.markers = [];
  }

  setMarker({ id, description, lon, lat, name }: Property) {
    console.log();

    this.map.addSource(`place${id}`, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              description,
            },
            geometry: {
              type: 'Point',
              coordinates: [lon, lat],
            },
          },
        ],
      },
    });
    this.map.addLayer({
      id: `place${id}`,
      type: 'circle',
      source: `place${id}`,
      paint: {
        'circle-color': '#4264fb',
        'circle-radius': 6,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      },
    });
    this.addTooltip({ id, description, lon, lat, name });
  }

  addTooltip({
    id,
    lon,
    lat,
    name,
    description,
  }: Pick<Property, 'id' | 'lon' | 'lat' | 'name' | 'description'>) {
    const message = `<h2>${name}</h2><p>${description}</p>`;
    const popup = new Popup({
      closeButton: false,
      closeOnClick: false,
    });

    this.map.on('mouseenter', `place${id}`, () => {
      popup.setLngLat([lon, lat]).setHTML(message).addTo(this.map);
      this.map.getCanvas().style.cursor = 'pointer';
    });

    this.map.on('mouseleave', `place${id}`, () => {
      this.map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }
  setMap() {
    this.map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-98.35, 39.5],
      zoom: 3,
      accessToken: environment.mbKey,
    });
  }
}
