import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dialog-edit-employee',
  templateUrl: './dialog-edit-employee.component.html',
  styleUrls: ['./dialog-edit-employee.component.scss']
})
export class DialogEditEmployeeComponent implements OnInit {
  editEmployeeForm!: FormGroup;
  listDepartment: any;
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private datePipe: DatePipe,
  ){}
  ngOnInit(): void {
    this.editEmployeeForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['Nam', Validators.required],
      dateOfBirth: ['', Validators.required],
      cccd: ['', Validators.required],
      address:  ['', Validators.required],
      mobilePhone:  ['', Validators.required],
      email:  ['', Validators.required],
      departmentId: [''],
      position: ['']
    });
    this.getAllDepartment();
    this.getEmployee(this.data.id);
  }

  getAllDepartment(){
    this.listDepartment = [];
    this.departmentService.getAllDepartment().subscribe({
      next: (res: any) => {
        if(res.length > 0){
          this.listDepartment = res;
        }
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }
  getEmployee(id: string){
    this.employeeService.getEmployee(id).subscribe({
      next: (res: any) => {
        this.editEmployeeForm.patchValue({
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          gender: res.gender ?? "",
          dateOfBirth: res.dateOfBirth,
          cccd: res.cccd,
          address:  res.address,
          mobilePhone:  res.mobilePhone,
          email:  res.email,
          departmentId: res.departmentId,
          position: res.position
        })
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }

  onSubmit(){
    const formObj = this.editEmployeeForm.value
    const data = formObj;
    data.dateOfBirth = this.datePipe.transform(formObj.dateOfBirth, 'yyyy-MM-dd') + 'T00:00:00.000Z'
    if(this.editEmployeeForm.valid){
      // console.log(this.editEmployeeForm.value);
      this.employeeService.editEmployee(data)
        .subscribe({
          next: (res) => {
            //console.log(res);
            //this.editEmployeeForm.reset();
          
            this.toast.success({detail: "Thông báo", summary: res.message, duration: 5000, position: "topCenter"});
            //this.router.navigate(['dashboard']);
            this.onClose()
          },
          error: (err) => {
            //console.log(err);
            this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
          }
        })
    }else{
      ValidateForm.validateAllFormFields(this.editEmployeeForm);
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
export interface DataDialog {
  id: string;
}
