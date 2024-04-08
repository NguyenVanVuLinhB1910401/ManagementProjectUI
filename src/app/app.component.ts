
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quản lý dự án';
  //title = 'angular16';
  //Sidebar toggle show hide function
  status = false;
  showSidebar: boolean = false;
  public userName: string = "";
  isExpanded: boolean = false;
  isGiamDoc: boolean = false;
  isThanhVien: boolean = false;
  isTruongNhom: boolean = false;
  data:any;
  userLogin: any;
  private userLoginSub: Subscription = new Subscription();
  constructor(
    private router: Router, 
    public auth: AuthService,
    public loaderService: LoaderService){
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
    this.userLoginSub = this.auth.userLogin$.subscribe(value => {
      this.userLogin = value;
    });
    if(this.userLogin?.Roles === 'GiamDoc' || this.userLogin?.Roles?.includes("GiamDoc")) this.isGiamDoc = true;
    else if(this.userLogin?.Roles === 'ThanhVien' || this.userLogin?.Roles?.includes("ThanhVien")) this.isThanhVien = true;
    else if(this.userLogin?.Roles === 'TruongNhom' || this.userLogin?.Roles?.includes("TruongNhom")) this.isTruongNhom = true;
  }

  logout(){
    this.auth.logout();
  }

  toggleCollapse(): void {
    this.isExpanded = !this.isExpanded;
  }

  addToggle()
  {
    this.status = !this.status;       
  }

  ngOnDestroy(): void {
    this.userLoginSub.unsubscribe();
  }
}
