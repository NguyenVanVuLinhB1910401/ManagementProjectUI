import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { DialogAddEmployeeComponent } from './dialog-add-employee/dialog-add-employee.component';
import { DialogEditEmployeeComponent } from './dialog-edit-employee/dialog-edit-employee.component';
import { DialogDeleteEmployeeComponent } from './dialog-delete-employee/dialog-delete-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['no', 'fullName', 'email', 'mobilePhone', 'gender', 'dateOfBirth', 'action'];
  dataSource: MatTableDataSource<Employee>;
  ELEMENT_DATA: Employee[] = [];
  constructor(
    private dialog: MatDialog,
    private toast: NgToastService,
    private employeeService: EmployeeService
    ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit(): void {
    this.getAllEmployee();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddEmployeeComponent, {
     
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllEmployee();
    });
  }

  getAllEmployee(){
    this.employeeService.getAllEmployee().subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          this.ELEMENT_DATA = [];
          res.forEach((element: any, index: number) => {
            const employee: Employee = {
              no: index,
              id: element.id,
              firstName: element.firstName,
              lastName: element.lastName,
              fullName: element.firstName + " " + element.lastName,
              userName: element.userName,
              email: element.email,
              cccd: element.cccd,
              dateOfBirth: element.dateOfBirth,
              address: element.address,
              gender: element.gender,
              mobilePhone: element.mobilePhone,
              departmentId: element?.department?.id,
              departmentName: element?.department?.name,
              position: element?.position
            };
            this.ELEMENT_DATA.push(employee);
          });
          this.dataSource.data = this.ELEMENT_DATA;
        }
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }
 
  openDialogEdit(id: string) {
    const dialogRef = this.dialog.open(DialogEditEmployeeComponent, {
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllEmployee();
    });
  }

  openDialogDelete(id: string, name: string) {
    const dialogRef = this.dialog.open(DialogDeleteEmployeeComponent, {
      width: "30%",
      autoFocus: false,
      data: {id: id, name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllEmployee();
    });
  }
}

export interface Employee {
  no: number;
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  cccd: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  mobilePhone: string;
  departmentId: string;
  departmentName: string;
  position: string;
}