import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ProjectService } from 'src/app/services/project.service';
import { DialogAddProjectComponent } from './dialog-add-project/dialog-add-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  displayedColumns: string[] = ['no', 'name', 'address', 'startDate', 'endDate', 'completeDate', 'status'];
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
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllProject();
    });
  }

  getAllProject(){
    this.projectService.getAllProject().subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          this.ELEMENT_DATA = [];
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
    // const dialogRef = this.dialog.open(DialogEditEmployeeComponent, {
    //   data: {id: id}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(`Dialog result: ${result}`);
    //   this.getAllEmployee();
    // });
  }

  openDialogDelete(id: string, name: string) {
    // const dialogRef = this.dialog.open(DialogDeleteEmployeeComponent, {
    //   width: "30%",
    //   autoFocus: false,
    //   data: {id: id, name: name}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(`Dialog result: ${result}`);
    //   this.getAllEmployee();
    // });
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
  members: any;
}