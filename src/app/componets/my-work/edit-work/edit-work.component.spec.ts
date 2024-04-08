import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkComponent } from './edit-work.component';

describe('EditWorkComponent', () => {
  let component: EditWorkComponent;
  let fixture: ComponentFixture<EditWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWorkComponent]
    });
    fixture = TestBed.createComponent(EditWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
