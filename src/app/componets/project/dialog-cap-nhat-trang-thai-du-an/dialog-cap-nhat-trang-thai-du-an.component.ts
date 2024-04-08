import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dialog-cap-nhat-trang-thai-du-an',
  templateUrl: './dialog-cap-nhat-trang-thai-du-an.component.html',
  styleUrls: ['./dialog-cap-nhat-trang-thai-du-an.component.scss']
})
export class DialogCapNhatTrangThaiDuAnComponent implements OnInit{
  status: any;
  constructor(
    public dialogRef: MatDialogRef<DialogCapNhatTrangThaiDuAnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private projectService: ProjectService,
    private toast: NgToastService,
  ){
    
  }
  ngOnInit(): void {
    this.status = this.data.statusInit;
  }
  onSubmit(){ 
      //console.log(this.editDepartmentForm.value);
      
      this.projectService.updateStatus({id: this.data.id, status: this.status})
        .subscribe({
          next: (res: any) => {
            //console.log(res);
            //this.editDepartmentForm.reset();
            this.toast.success({detail: "Thông báo", summary: res.message, duration: 5000, position: "topCenter"});
            //this.router.navigate(['dashboard']);
            this.onClose()
          },
          error: (err) => {
            //console.log(err);
            this.toast.error({detail: "Thông báo", summary: err.error.message ?? err.message, duration: 5000, position: "topCenter"});
          }
        })
  }

  onClose() {
    this.dialogRef.close();
  }
}

export interface DataDialog {
  id: string;
  statusInit: number;
}
