import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJobListComponent } from './list-jobs.component';

describe('AllJobListComponent', () => {
  let component: AllJobListComponent;
  let fixture: ComponentFixture<AllJobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllJobListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
