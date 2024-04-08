import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogXoaQuyTrinhComponent } from './dialog-xoa-quy-trinh.component';

describe('DialogXoaQuyTrinhComponent', () => {
  let component: DialogXoaQuyTrinhComponent;
  let fixture: ComponentFixture<DialogXoaQuyTrinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogXoaQuyTrinhComponent]
    });
    fixture = TestBed.createComponent(DialogXoaQuyTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
