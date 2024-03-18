import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform'
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-add-employee.component.html',
  styleUrls: ['./dialog-add-employee.component.scss']
})
export class DialogAddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  listDepartment: any;
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogAddEmployeeComponent>,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private datePipe: DatePipe,
  ){}
  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
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

  onSubmit(){
    const formObj = this.addEmployeeForm.value
    const data = formObj;
    data.dateOfBirth = this.datePipe.transform(formObj.dateOfBirth, 'yyyy-MM-dd') + 'T00:00:00.000Z'
    if(this.addEmployeeForm.valid){
      // console.log(this.addEmployeeForm.value);
      this.employeeService.addEmployee(data)
        .subscribe({
          next: (res) => {
            //console.log(res);
            //this.addEmployeeForm.reset();
          
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
      ValidateForm.validateAllFormFields(this.addEmployeeForm);
    }
  }
  onClose() {
    this.dialogRef.close();
}

}
