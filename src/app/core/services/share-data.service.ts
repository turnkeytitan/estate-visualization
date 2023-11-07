import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Filter } from '../interfaces/filter';
import { Property } from '../interfaces/place-info';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  private filter$: Subject<Filter> = new Subject<Filter>();
  filter: Observable<Filter> = this.filter$.asObservable();

  private Property$: Subject<Property> = new Subject<Property>();
  Property: Observable<Property> = this.Property$.asObservable();

  setFilter(data: Filter) {
    this.filter$.next(data);
  }
  setProperty(data: Property) {
    this.Property$.next(data);
  }
}
