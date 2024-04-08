import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { QuyTrinhService } from 'src/app/services/quy-trinh.service';

@Component({
  selector: 'app-dialog-xoa-quy-trinh',
  templateUrl: './dialog-xoa-quy-trinh.component.html',
  styleUrls: ['./dialog-xoa-quy-trinh.component.scss']
})
export class DialogXoaQuyTrinhComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogXoaQuyTrinhComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private quyTrinhService: QuyTrinhService,
    private toast: NgToastService,
  ){}
  ngOnInit(): void {
    
  }
  onSubmit(){
      // console.log(this.editDepartmentForm.value);
      this.quyTrinhService.xoaQuyTrinh(this.data.id)
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

