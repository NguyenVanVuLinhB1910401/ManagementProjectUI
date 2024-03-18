import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  equipments: any;
  public userName: string = "";
  constructor(private auth: AuthService, ){ }
  ngOnInit(): void {
    
      
  }
  logout(){
    this.auth.logout();
  }

}
