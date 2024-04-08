import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChuyenBuocTiepTheoComponent } from './dialog-chuyen-buoc-tiep-theo.component';

describe('DialogChuyenBuocTiepTheoComponent', () => {
  let component: DialogChuyenBuocTiepTheoComponent;
  let fixture: ComponentFixture<DialogChuyenBuocTiepTheoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogChuyenBuocTiepTheoComponent]
    });
    fixture = TestBed.createComponent(DialogChuyenBuocTiepTheoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
