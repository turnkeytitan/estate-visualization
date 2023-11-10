import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnDestroy {
  isLoading = false;
  private subscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.subscription = this.loadingService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
