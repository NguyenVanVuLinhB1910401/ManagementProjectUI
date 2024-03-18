import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  equipments: any;
  public userName: string = "";
  constructor(private auth: AuthService, private equipService: EquipmentService){ }
  ngOnInit(): void {
    this.equipService.getAll().subscribe({
      next: res => {
        console.log(res);
      },
      error: res => {
        console.log(res);
      }
    });
      
  }
  logout(){
    this.auth.logout();
  }

}
