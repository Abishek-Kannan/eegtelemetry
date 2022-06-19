import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EegViewerComponent } from './eeg-viewer.component';

describe('EegViewerComponent', () => {
  let component: EegViewerComponent;
  let fixture: ComponentFixture<EegViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EegViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EegViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
