import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteJobsComponent } from './favored-jobs.component';

describe('FavoriteJobsComponent', () => {
  let component: FavoriteJobsComponent;
  let fixture: ComponentFixture<FavoriteJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
