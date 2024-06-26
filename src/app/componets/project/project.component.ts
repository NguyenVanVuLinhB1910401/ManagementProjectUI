import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ProjectService } from 'src/app/services/project.service';
import { DialogAddProjectComponent } from './dialog-add-project/dialog-add-project.component';
import { DialogEditProjectComponent } from './dialog-edit-project/dialog-edit-project.component';
import { DialogDeleteProjectComponent } from './dialog-delete-project/dialog-delete-project.component';
import { DialogCapNhatTrangThaiDuAnComponent } from './dialog-cap-nhat-trang-thai-du-an/dialog-cap-nhat-trang-thai-du-an.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
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
    this.getAllProject();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddProjectComponent, {
      width: "90%",
      //height: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllProject();
    });
  }

  getAllProject(){
    this.ELEMENT_DATA = [];
    this.projectService.getAllProject().subscribe({
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
 
  openDialogEdit(id: string) {
    const dialogRef = this.dialog.open(DialogEditProjectComponent, {
      width: "90%",
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllProject();
    });
  }

  openDialogDelete(id: string, name: string) {
    const dialogRef = this.dialog.open(DialogDeleteProjectComponent, {
      width: "30%",
      autoFocus: false,
      data: {id: id, name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllProject();
    });
  }

  openDialogUpdateStatusProject(projectId: string, status: number){
    const dialogRef = this.dialog.open(DialogCapNhatTrangThaiDuAnComponent, {
      width: "35%",
      data: {id: projectId, statusInit: status}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllProject();
    });
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