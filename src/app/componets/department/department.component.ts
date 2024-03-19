import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { DialogAddDepartmentComponent } from './dialog-add-department/dialog-add-department.component';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/services/department.service';
import { NgToastService } from 'ng-angular-popup';
import { DialogEditDepartmentComponent } from './dialog-edit-department/dialog-edit-department.component';
import { DialogDeleteDepartmentComponent } from './dialog-delete-department/dialog-delete-department.component';



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})


export class DepartmentComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'description', 'created', 'action'];
  dataSource: MatTableDataSource<Department>;
  ELEMENT_DATA: Department[] = [];
  constructor(
    private dialog: MatDialog,
    private toast: NgToastService,
    private departmentService: DepartmentService
    ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit(): void {
    this.getAllDepartment();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddDepartmentComponent, {
      width: "30%",
      height: "auto"
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllDepartment();
    });
  }

  getAllDepartment(){
    this.ELEMENT_DATA = [];
    this.departmentService.getAllDepartment().subscribe({
      next: (res: any) => {
        if(res.length > 0){
          res.forEach((element: any, index: number) => {
            const department: Department = {
              no: index,
              id: element.id,
              name: element.name,
              description: element.description,
              created: element.created,
              status: element.status
            };
            this.ELEMENT_DATA.push(department);
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
    const dialogRef = this.dialog.open(DialogEditDepartmentComponent, {
      width: "30%",
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllDepartment();
    });
  }

  openDialogDelete(id: string, name: string) {
    const dialogRef = this.dialog.open(DialogDeleteDepartmentComponent, {
      width: "30%",
      data: {id: id, name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllDepartment();
    });
  }
}

export interface Department {
  no: number;
  id: string;
  name: string;
  description: string;
  created: string;
  status: number;
}