import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteDepartmentComponent } from './dialog-delete-department.component';

describe('DialogDeleteDepartmentComponent', () => {
  let component: DialogDeleteDepartmentComponent;
  let fixture: ComponentFixture<DialogDeleteDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteDepartmentComponent]
    });
    fixture = TestBed.createComponent(DialogDeleteDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
