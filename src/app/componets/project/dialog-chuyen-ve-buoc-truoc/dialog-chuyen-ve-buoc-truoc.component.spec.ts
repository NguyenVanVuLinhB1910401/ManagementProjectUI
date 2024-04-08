import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChuyenVeBuocTruocComponent } from './dialog-chuyen-ve-buoc-truoc.component';

describe('DialogChuyenVeBuocTruocComponent', () => {
  let component: DialogChuyenVeBuocTruocComponent;
  let fixture: ComponentFixture<DialogChuyenVeBuocTruocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogChuyenVeBuocTruocComponent]
    });
    fixture = TestBed.createComponent(DialogChuyenVeBuocTruocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
