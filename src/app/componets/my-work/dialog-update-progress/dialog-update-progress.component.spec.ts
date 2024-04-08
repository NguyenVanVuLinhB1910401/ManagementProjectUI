import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateProgressComponent } from './dialog-update-progress.component';

describe('DialogUpdateProgressComponent', () => {
  let component: DialogUpdateProgressComponent;
  let fixture: ComponentFixture<DialogUpdateProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUpdateProgressComponent]
    });
    fixture = TestBed.createComponent(DialogUpdateProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
