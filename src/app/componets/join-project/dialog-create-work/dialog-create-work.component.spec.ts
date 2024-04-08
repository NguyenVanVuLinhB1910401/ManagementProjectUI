import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateWorkComponent } from './dialog-create-work.component';

describe('DialogCreateWorkComponent', () => {
  let component: DialogCreateWorkComponent;
  let fixture: ComponentFixture<DialogCreateWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCreateWorkComponent]
    });
    fixture = TestBed.createComponent(DialogCreateWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
