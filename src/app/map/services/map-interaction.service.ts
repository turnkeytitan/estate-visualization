import { Injectable } from '@angular/core';
import { Property } from 'app/core/interfaces/place-info';
import { environment } from 'environments/environment.development';
import { LngLatLike, Map, Popup } from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapInteractionService {
  deletePlaces(map: Map) {
    if (map.isStyleLoaded()) {
      const existingLayers = map.getStyle().layers;
      existingLayers.forEach((layer) => {
        if (layer.id.includes('place')) {
          map.removeLayer(layer.id);
        }
      });
      const existingSources = map.getStyle().sources;
      Object.keys(existingSources).forEach((sourceId) => {
        if (sourceId.includes('place')) {
          map.removeSource(sourceId);
        }
      });
    }
  }

  setMarker(property: Property, map: Map) {
    const { id, description, lon, lat } = property;

    map.addSource(`place${id}`, {
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
    map.addLayer({
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
  }

  addTooltip(property: Property, map: Map) {
    const { name, description, id, lon, lat } = property;
    const message = `<h2>${name}</h2><p>${description}</p>`;
    const popup = new Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on('mouseenter', `place${id}`, () => {
      popup.setLngLat([lon, lat]).setHTML(message).addTo(map);
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', `place${id}`, () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }
  handlePropertyClick(
    property: Property,
    map: Map,
    itemClicked: (point: string) => void,
  ) {
    const { id } = property;
    const called = () => {
      itemClicked(id);
    };

    map.on('click', `place${id}`, called);
  }
  getMap(lonLat: LngLatLike = [-98.35, 39.5]) {
    return new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: lonLat,
      zoom: 3,
      accessToken: environment.mbKey,
    });
  }
}
