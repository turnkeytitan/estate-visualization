import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDataService } from 'app/core/services/share-data.service';
import { Property } from 'app/core/interfaces/place-info';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-full-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-info.component.html',
  styleUrls: ['./full-info.component.scss'],
})
export class FullInfoComponent {
  property$: Observable<Property>;
  constructor(private shared: ShareDataService) {
    this.property$ = shared.property;
  }
}
