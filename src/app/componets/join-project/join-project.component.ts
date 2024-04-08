import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ProjectService } from 'src/app/services/project.service';
import { DialogAddProjectComponent } from '../project/dialog-add-project/dialog-add-project.component';
import { DialogEditProjectComponent } from '../project/dialog-edit-project/dialog-edit-project.component';
import { DialogDeleteProjectComponent } from '../project/dialog-delete-project/dialog-delete-project.component';
import { DialogCreateWorkComponent } from './dialog-create-work/dialog-create-work.component';

@Component({
  selector: 'app-join-project',
  templateUrl: './join-project.component.html',
  styleUrls: ['./join-project.component.scss']
})
export class JoinProjectComponent {
  displayedColumns: string[] = ['no', 'name', 'address', 'startDate', 'endDate', 'completeDate', 'status', 'action'];
  dataSource: MatTableDataSource<Project>;
  ELEMENT_DATA: Project[] = [];
  constructor(
    private dialog: MatDialog,
    private toast: NgToastService,
    private projectService: ProjectService
    ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit(): void {
    this.getAllProjectJoined();
  }
  openDialog(id: string, name: string) {
    const dialogRef = this.dialog.open(DialogCreateWorkComponent, {
      width: "60%",
      data: { id: id, projectName: name, parentWorkId: 0}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllProjectJoined();
    });
  }

  getAllProjectJoined(){
    this.ELEMENT_DATA = [];
    this.projectService.getAllProjectJoined().subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          res.forEach((element: any, index: number) => {
            const project: Project = {
              no: index,
              id: element.id,
              name: element.name,
              address: element.address,
              startDate: element.startDate,
              endDate: element.endDate,
              completeDate: element.completeDate,
              status: element.status,
              members: element.members
            };
            if(project.status == 1){
              project.statusName = "Vừa mới tạo"
            }
            this.ELEMENT_DATA.push(project);
          });
          this.dataSource.data = this.ELEMENT_DATA;
        }
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }
 
 
}
export interface Project {
  no: number;
  id: string;
  name: string;
  address: string;
  startDate: string;
  endDate: string;
  completeDate: string;
  status: number;
  statusName?: string;
  members: any;
}
