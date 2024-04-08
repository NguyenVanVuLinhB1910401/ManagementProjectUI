import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCapNhatTrangThaiDuAnComponent } from './dialog-cap-nhat-trang-thai-du-an.component';

describe('DialogCapNhatTrangThaiDuAnComponent', () => {
  let component: DialogCapNhatTrangThaiDuAnComponent;
  let fixture: ComponentFixture<DialogCapNhatTrangThaiDuAnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCapNhatTrangThaiDuAnComponent]
    });
    fixture = TestBed.createComponent(DialogCapNhatTrangThaiDuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
