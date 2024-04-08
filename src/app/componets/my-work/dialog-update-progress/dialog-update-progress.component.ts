import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-dialog-update-progress',
  templateUrl: './dialog-update-progress.component.html',
  styleUrls: ['./dialog-update-progress.component.scss']
})
export class DialogUpdateProgressComponent {
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  constructor(
    public dialogRef: MatDialogRef<DialogUpdateProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private workService: WorkService,
    private toast: NgToastService,
  ){}
  ngOnInit(): void {
    this.value = this.data.progressInit;
  }
  onSubmit(){
      //console.log(this.editDepartmentForm.value);
      
      this.workService.updateProgress({id: this.data.id, progress: this.value})
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
  progressInit: number;
  // name: string;
}
