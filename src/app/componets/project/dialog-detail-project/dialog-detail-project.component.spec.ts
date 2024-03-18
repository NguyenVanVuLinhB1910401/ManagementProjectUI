import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailProjectComponent } from './dialog-detail-project.component';

describe('DialogDetailProjectComponent', () => {
  let component: DialogDetailProjectComponent;
  let fixture: ComponentFixture<DialogDetailProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailProjectComponent]
    });
    fixture = TestBed.createComponent(DialogDetailProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
