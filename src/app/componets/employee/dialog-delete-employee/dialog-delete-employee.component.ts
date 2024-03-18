import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dialog-delete-employee',
  templateUrl: './dialog-delete-employee.component.html',
  styleUrls: ['./dialog-delete-employee.component.scss']
})
export class DialogDeleteEmployeeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private employeeService: EmployeeService,
    private toast: NgToastService,
  ){}
  ngOnInit(): void {
    
  }
  onSubmit(){
      // console.log(this.editDepartmentForm.value);
      this.employeeService.deleteEmployee(this.data.id)
        .subscribe({
          next: (res) => {
            //console.log(res);
            //this.editDepartmentForm.reset();
          
            this.toast.success({detail: "Thông báo", summary: res.message, duration: 5000, position: "topCenter"});
            //this.router.navigate(['dashboard']);
            this.onClose()
          },
          error: (err) => {
            //console.log(err);
            this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
          }
        })
    
  }

  onClose() {
    this.dialogRef.close();
  }
}
export interface DataDialog {
  id: string;
  name: string;
}
