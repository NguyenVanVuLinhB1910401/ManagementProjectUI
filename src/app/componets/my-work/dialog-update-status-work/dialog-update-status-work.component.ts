import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-dialog-update-status-work',
  templateUrl: './dialog-update-status-work.component.html',
  styleUrls: ['./dialog-update-status-work.component.scss']
})
export class DialogUpdateStatusWorkComponent {
  status: any;
  constructor(
    public dialogRef: MatDialogRef<DialogUpdateStatusWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private workService: WorkService,
    private toast: NgToastService,
  ){
    
  }
  ngOnInit(): void {
    this.status = this.data.statusInit;
  }
  onSubmit(){ 
      //console.log(this.editDepartmentForm.value);
      
      this.workService.updateStatus({id: this.data.id, status: this.status})
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
  id: number;
  statusInit: number;
}
