import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateStatusWorkComponent } from './dialog-update-status-work.component';

describe('DialogUpdateStatusWorkComponent', () => {
  let component: DialogUpdateStatusWorkComponent;
  let fixture: ComponentFixture<DialogUpdateStatusWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUpdateStatusWorkComponent]
    });
    fixture = TestBed.createComponent(DialogUpdateStatusWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
