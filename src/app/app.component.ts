
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ManagementEquipmentUI';
  //title = 'angular16';
  //Sidebar toggle show hide function
  status = false;
  showSidebar: boolean = false;
  public userName: string = "";
  addToggle()
  {
    this.status = !this.status;       
  }
  data:any;
  constructor(private router: Router, private auth: AuthService){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // const currentPath = event.url;
        // console.log(currentPath);
        const currentPathWithoutParams = this.router.url.split('?')[0]; // Đường dẫn hiện tại không có tham số
        this.showSidebar = !['/login', '/signup', '/reset'].includes(currentPathWithoutParams);
      }
    });
  }

  ngOnInit(): void {
  }
  logout(){
    this.auth.logout();
  }
}
