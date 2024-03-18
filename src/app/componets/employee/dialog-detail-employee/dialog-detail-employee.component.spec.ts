import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailEmployeeComponent } from './dialog-detail-employee.component';

describe('DialogDetailEmployeeComponent', () => {
  let component: DialogDetailEmployeeComponent;
  let fixture: ComponentFixture<DialogDetailEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailEmployeeComponent]
    });
    fixture = TestBed.createComponent(DialogDetailEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
