import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogXemChiTietComponent } from './dialog-xem-chi-tiet.component';

describe('DialogXemChiTietComponent', () => {
  let component: DialogXemChiTietComponent;
  let fixture: ComponentFixture<DialogXemChiTietComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogXemChiTietComponent]
    });
    fixture = TestBed.createComponent(DialogXemChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
