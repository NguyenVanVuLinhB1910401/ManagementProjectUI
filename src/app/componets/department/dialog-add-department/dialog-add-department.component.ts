import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-dialog-add-department',
  templateUrl: './dialog-add-department.component.html',
  styleUrls: ['./dialog-add-department.component.scss']
})
export class DialogAddDepartmentComponent implements OnInit {
  addDepartmentForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogAddDepartmentComponent>,
    private departmentService: DepartmentService,
    private toast: NgToastService,
  ){}
  ngOnInit(): void {
    this.addDepartmentForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['']
    });
  }
  onSubmit(){
    if(this.addDepartmentForm.valid){
      // console.log(this.addDepartmentForm.value);
      this.departmentService.addDepartment(this.addDepartmentForm.value)
        .subscribe({
          next: (res) => {
            //console.log(res);
            //this.addDepartmentForm.reset();
          
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
      ValidateForm.validateAllFormFields(this.addDepartmentForm);
    }
  }
  onClose() {
    this.dialogRef.close();
}

}
