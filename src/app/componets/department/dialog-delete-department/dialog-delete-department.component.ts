import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog-delete-department',
  templateUrl: './dialog-delete-department.component.html',
  styleUrls: ['./dialog-delete-department.component.scss']
})
export class DialogDeleteDepartmentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private departmentService: DepartmentService,
    private toast: NgToastService,
  ){}
  ngOnInit(): void {
    
  }
  onSubmit(){
    
      // console.log(this.editDepartmentForm.value);
      this.departmentService.deleteDepartment(this.data.id)
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
