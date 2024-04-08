import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './componets/reset-password/reset-password.component';
import { DepartmentComponent } from './componets/department/department.component';
import { EmployeeComponent } from './componets/employee/employee.component';
import { ProjectComponent } from './componets/project/project.component';
import { JoinProjectComponent } from './componets/join-project/join-project.component';
import { MyWorkComponent } from './componets/my-work/my-work.component';
import { QuytrinhComponent } from './componets/quytrinh/quytrinh.component';
import { DetailProjectComponent } from './componets/project/detail-project/detail-project.component';
import { ListProjectComponent } from './componets/project/list-project/list-project.component';
import { CongViecDaGiaoComponent } from './componets/my-work/cong-viec-da-giao/cong-viec-da-giao.component';
import { CongViecDuocGiaoComponent } from './componets/my-work/cong-viec-duoc-giao/cong-viec-duoc-giao.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },
  { path: "reset", component: ResetPasswordComponent },
  { path: "department", component: DepartmentComponent, canActivate: [authGuard] },
  { path: "employee", component: EmployeeComponent, canActivate: [authGuard] },
  { path: "project", component: ProjectComponent, canActivate: [authGuard], children: [
    {
      path: '',  // Đường dẫn cho route con
      component: ListProjectComponent,  // Component cho route con
    },
    {
      path: 'detail/:id',  // Đường dẫn cho route con
      component: DetailProjectComponent,  // Component cho route con
    }
    // Bạn có thể thêm nhiều route con khác ở đây nếu cần
  ] },
  { path: "join-project", component: JoinProjectComponent, canActivate: [authGuard] },
  { path: "my-work", component: MyWorkComponent, canActivate: [authGuard] },
  { path: "my-work", component: MyWorkComponent, canActivate: [authGuard], children: [
    {
      path: 'assign',  // Đường dẫn cho route con
      component: CongViecDaGiaoComponent,  // Component cho route con
    },
    {
      path: 'assigned',  // Đường dẫn cho route con
      component: CongViecDuocGiaoComponent,  // Component cho route con
    },
    // Bạn có thể thêm nhiều route con khác ở đây nếu cần
  ] },
  { path: "quy-trinh", component: QuytrinhComponent, canActivate: [authGuard] },
  { path: "**", redirectTo: "/dashboard"}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
