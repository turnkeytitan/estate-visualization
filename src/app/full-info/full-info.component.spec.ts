import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullInfoComponent } from './full-info.component';

describe('FullInfoComponent', () => {
  let component: FullInfoComponent;
  let fixture: ComponentFixture<FullInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FullInfoComponent],
    });
    fixture = TestBed.createComponent(FullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
