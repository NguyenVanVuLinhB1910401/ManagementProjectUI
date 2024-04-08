import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgToastModule } from 'ng-angular-popup' // to be added
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetPasswordComponent } from './componets/reset-password/reset-password.component';
import { DepartmentComponent } from './componets/department/department.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogAddDepartmentComponent } from './componets/department/dialog-add-department/dialog-add-department.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { DialogEditDepartmentComponent } from './componets/department/dialog-edit-department/dialog-edit-department.component';
import { DialogDeleteDepartmentComponent } from './componets/department/dialog-delete-department/dialog-delete-department.component';
import { EmployeeComponent } from './componets/employee/employee.component';
import { DialogAddEmployeeComponent } from './componets/employee/dialog-add-employee/dialog-add-employee.component';
import { DialogEditEmployeeComponent } from './componets/employee/dialog-edit-employee/dialog-edit-employee.component';
import { DialogDeleteEmployeeComponent } from './componets/employee/dialog-delete-employee/dialog-delete-employee.component';
import { DialogDetailEmployeeComponent } from './componets/employee/dialog-detail-employee/dialog-detail-employee.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectComponent } from './componets/project/project.component';
import { DialogAddProjectComponent } from './componets/project/dialog-add-project/dialog-add-project.component';
import { DialogEditProjectComponent } from './componets/project/dialog-edit-project/dialog-edit-project.component';
import { DialogDeleteProjectComponent } from './componets/project/dialog-delete-project/dialog-delete-project.component';
import { DialogDetailProjectComponent } from './componets/project/dialog-detail-project/dialog-detail-project.component';
import { MatIconModule } from '@angular/material/icon';
import { JoinProjectComponent } from './componets/join-project/join-project.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { DialogCreateWorkComponent } from './componets/join-project/dialog-create-work/dialog-create-work.component';
import { MyWorkComponent } from './componets/my-work/my-work.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DetailWorkComponent } from './componets/my-work/detail-work/detail-work.component';
import { EditWorkComponent } from './componets/my-work/edit-work/edit-work.component';
import {MatSliderModule} from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { DialogUpdateProgressComponent } from './componets/my-work/dialog-update-progress/dialog-update-progress.component';
import { DialogUpdateStatusWorkComponent } from './componets/my-work/dialog-update-status-work/dialog-update-status-work.component';
import {MatMenuModule} from '@angular/material/menu';
import { QuytrinhComponent } from './componets/quytrinh/quytrinh.component';
import { DialogTaoQuyTrinhComponent } from './componets/quytrinh/dialog-tao-quy-trinh/dialog-tao-quy-trinh.component';
import { DetailProjectComponent } from './componets/project/detail-project/detail-project.component';
import { ListProjectComponent } from './componets/project/list-project/list-project.component';
import { DialogXoaQuyTrinhComponent } from './componets/quytrinh/dialog-xoa-quy-trinh/dialog-xoa-quy-trinh.component';
import { DialogXemChiTietComponent } from './componets/quytrinh/dialog-xem-chi-tiet/dialog-xem-chi-tiet.component';
import { DialogChuyenBuocTiepTheoComponent } from './componets/project/dialog-chuyen-buoc-tiep-theo/dialog-chuyen-buoc-tiep-theo.component';
import { CongViecDaGiaoComponent } from './componets/my-work/cong-viec-da-giao/cong-viec-da-giao.component';
import { CongViecDuocGiaoComponent } from './componets/my-work/cong-viec-duoc-giao/cong-viec-duoc-giao.component';
import {NgxUiLoaderModule } from 'ngx-ui-loader';
import { DialogChuyenVeBuocTruocComponent } from './componets/project/dialog-chuyen-ve-buoc-truoc/dialog-chuyen-ve-buoc-truoc.component';
import { DialogCapNhatTrangThaiDuAnComponent } from './componets/project/dialog-cap-nhat-trang-thai-du-an/dialog-cap-nhat-trang-thai-du-an.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ResetPasswordComponent,
    DepartmentComponent,
    DialogAddDepartmentComponent,
    DialogEditDepartmentComponent,
    DialogDeleteDepartmentComponent,
    EmployeeComponent,
    DialogAddEmployeeComponent,
    DialogEditEmployeeComponent,
    DialogDeleteEmployeeComponent,
    DialogDetailEmployeeComponent,
    ProjectComponent,
    DialogAddProjectComponent,
    DialogEditProjectComponent,
    DialogDeleteProjectComponent,
    DialogDetailProjectComponent,
    JoinProjectComponent,
    DialogCreateWorkComponent,
    MyWorkComponent,
    DetailWorkComponent,
    EditWorkComponent,
    DialogUpdateProgressComponent,
    DialogUpdateStatusWorkComponent,
    QuytrinhComponent,
    DialogTaoQuyTrinhComponent,
    DetailProjectComponent,
    ListProjectComponent,
    DialogXoaQuyTrinhComponent,
    DialogXemChiTietComponent,
    DialogChuyenBuocTiepTheoComponent,
    CongViecDaGiaoComponent,
    CongViecDuocGiaoComponent,
    DialogChuyenVeBuocTruocComponent,
    DialogCapNhatTrangThaiDuAnComponent,
    

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatCardModule,
    MatMenuModule,
    NgxUiLoaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'vi' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
