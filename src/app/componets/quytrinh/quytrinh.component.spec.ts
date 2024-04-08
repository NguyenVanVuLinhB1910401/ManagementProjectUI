import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhComponent } from './quytrinh.component';

describe('QuytrinhComponent', () => {
  let component: QuytrinhComponent;
  let fixture: ComponentFixture<QuytrinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuytrinhComponent]
    });
    fixture = TestBed.createComponent(QuytrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
