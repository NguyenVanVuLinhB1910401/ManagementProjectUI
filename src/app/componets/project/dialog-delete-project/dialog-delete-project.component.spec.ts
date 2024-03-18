import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteProjectComponent } from './dialog-delete-project.component';

describe('DialogDeleteProjectComponent', () => {
  let component: DialogDeleteProjectComponent;
  let fixture: ComponentFixture<DialogDeleteProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteProjectComponent]
    });
    fixture = TestBed.createComponent(DialogDeleteProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
