import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongViecDuocGiaoComponent } from './cong-viec-duoc-giao.component';

describe('CongViecDuocGiaoComponent', () => {
  let component: CongViecDuocGiaoComponent;
  let fixture: ComponentFixture<CongViecDuocGiaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CongViecDuocGiaoComponent]
    });
    fixture = TestBed.createComponent(CongViecDuocGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
