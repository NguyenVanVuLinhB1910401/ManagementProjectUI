import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dialog-delete-project',
  templateUrl: './dialog-delete-project.component.html',
  styleUrls: ['./dialog-delete-project.component.scss']
})
export class DialogDeleteProjectComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private projectService: ProjectService,
    private toast: NgToastService,
  ){}
  ngOnInit(): void {
    
  }
  onSubmit(){
      // console.log(this.editDepartmentForm.value);
      this.projectService.deleteProject(this.data.id)
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

