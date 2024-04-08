import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaoQuyTrinhComponent } from './dialog-tao-quy-trinh.component';

describe('DialogTaoQuyTrinhComponent', () => {
  let component: DialogTaoQuyTrinhComponent;
  let fixture: ComponentFixture<DialogTaoQuyTrinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTaoQuyTrinhComponent]
    });
    fixture = TestBed.createComponent(DialogTaoQuyTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
