import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryEquipmentComponent } from './history-equipment.component';

describe('HistoryEquipmentComponent', () => {
  let component: HistoryEquipmentComponent;
  let fixture: ComponentFixture<HistoryEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryEquipmentComponent]
    });
    fixture = TestBed.createComponent(HistoryEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
