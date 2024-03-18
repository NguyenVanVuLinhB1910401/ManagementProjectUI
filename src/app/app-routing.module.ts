import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './componets/reset-password/reset-password.component';
import { ListUserComponent } from './componets/user/list-user/list-user.component';
import { ListEquipmentComponent } from './componets/equipment/list-equipment/list-equipment.component';
import { EquipmentTypeComponent } from './componets/equipment-type/equipment-type.component';
import { HistoryEquipmentComponent } from './componets/history-equipment/history-equipment.component';
import { DepartmentComponent } from './componets/department/department.component';
import { EmployeeComponent } from './componets/employee/employee.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },
  { path: "reset", component: ResetPasswordComponent },
  { path: "user", component: ListUserComponent, canActivate: [authGuard] },
  { path: "equipment", component: ListEquipmentComponent, canActivate: [authGuard] },
  { path: "equipment/historyequipment/:id", component: HistoryEquipmentComponent },
  { path: "equipmenttype", component: EquipmentTypeComponent, canActivate: [authGuard] },
  { path: "department", component: DepartmentComponent, canActivate: [authGuard] },
  { path: "employee", component: EmployeeComponent, canActivate: [authGuard] },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
