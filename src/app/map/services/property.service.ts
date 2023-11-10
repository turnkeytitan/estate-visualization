import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Property } from 'app/core/interfaces/place-info';
import { Filter } from 'app/core/interfaces/filter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'platform',
})
export class PropertyService {
  constructor(private http: HttpClient) {}
  //TODO: as the filtering should be done in the backend as should all
  //the business login, this is only temporary and has to change to be fetched
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.backend}/properties`);
  }
  filterProperties(properties: Property[], filter: Filter | null) {
    let filtered = [];
    if (!filter) {
      filtered = [...properties];
    } else {
      filtered = properties.filter((property) => {
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
    return filtered;
  }
}
