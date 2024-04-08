import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongViecDaGiaoComponent } from './cong-viec-da-giao.component';

describe('CongViecDaGiaoComponent', () => {
  let component: CongViecDaGiaoComponent;
  let fixture: ComponentFixture<CongViecDaGiaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CongViecDaGiaoComponent]
    });
    fixture = TestBed.createComponent(CongViecDaGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
