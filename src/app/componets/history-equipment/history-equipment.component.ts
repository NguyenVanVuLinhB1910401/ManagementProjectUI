import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-history-equipment',
  templateUrl: './history-equipment.component.html',
  styleUrls: ['./history-equipment.component.scss']
})
export class HistoryEquipmentComponent implements OnInit {
  history: any;
  id: string = '';
  constructor(private equipmentService: EquipmentService, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Lấy giá trị của id từ tham số
      // Tiếp tục xử lý dữ liệu của bạn tại đây
      this.equipmentService.historyEquipment(this.id)
      .subscribe({
        next: (res) => {
          console.log(this.history);
          this.history = res;
         
          
        },
        error: (err) => {

        }
      })
      });
    
  }

}
