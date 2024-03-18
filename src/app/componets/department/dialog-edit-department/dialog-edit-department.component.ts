import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-dialog-edit-department',
  templateUrl: './dialog-edit-department.component.html',
  styleUrls: ['./dialog-edit-department.component.scss']
})
export class DialogEditDepartmentComponent implements OnInit {
  editDepartmentForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogEditDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private departmentService: DepartmentService,
    private toast: NgToastService,
  ){}
  ngOnInit(): void {
    this.getDepartment(this.data.id);
    this.editDepartmentForm = this.fb.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      description: ['']
    });
  }
  onSubmit(){
    if(this.editDepartmentForm.valid){
      // console.log(this.editDepartmentForm.value);
      this.departmentService.editDepartment(this.editDepartmentForm.value)
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
    }else{
      ValidateForm.validateAllFormFields(this.editDepartmentForm);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
  
  getDepartment(id: string){
    this.departmentService.getDepartment(id).subscribe({
      next: (res: any) => {
        this.editDepartmentForm.patchValue({
          id: res.id,
          name: res.name,
          description: res.description
        })
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }
}

export interface DataDialog {
  id: string;
}
