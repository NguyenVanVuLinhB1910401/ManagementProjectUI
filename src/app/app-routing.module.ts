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

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },
  { path: "reset", component: ResetPasswordComponent },
  { path: "department", component: DepartmentComponent, canActivate: [authGuard] },
  { path: "employee", component: EmployeeComponent, canActivate: [authGuard] },
  { path: "project", component: ProjectComponent, canActivate: [authGuard] },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
