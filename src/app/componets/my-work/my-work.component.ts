import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ProjectService } from 'src/app/services/project.service';
import { WorkService } from 'src/app/services/work.service';
import { DetailWorkComponent } from './detail-work/detail-work.component';
import { DialogUpdateProgressComponent } from './dialog-update-progress/dialog-update-progress.component';
import { DialogUpdateStatusWorkComponent } from './dialog-update-status-work/dialog-update-status-work.component';

@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss']
})
export class MyWorkComponent {
  displayedColumns: string[] = ['no', 'title', 'project', 'assignUser', 'assignedUser', 'startDate', 'endDate', 'completeDate', 'status', 'progress', 'action'];
  dataSource: MatTableDataSource<Work>;
  ELEMENT_DATA: Work[] = [];

  displayedColumnsIAssign: string[] = ['no', 'title', 'project', 'assignUser', 'assignedUser', 'startDate', 'endDate', 'completeDate', 'status', 'progress', 'action'];
  dataSourceIAssign: MatTableDataSource<Work>;
  ELEMENT_DATA_IASSIGN: Work[] = [];

  displayedColumnsAssigned: string[] = ['no', 'title', 'project', 'assignUser', 'assignedUser', 'startDate', 'endDate', 'completeDate', 'status', 'progress', 'action'];
  dataSourceAssigned: MatTableDataSource<Work>;
  ELEMENT_DATA_ASSIGNED: Work[] = [];

  constructor(
    private dialog: MatDialog,
    private toast: NgToastService,
    private workService: WorkService
    ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSourceIAssign = new MatTableDataSource(this.ELEMENT_DATA_IASSIGN);
    this.dataSourceAssigned = new MatTableDataSource(this.ELEMENT_DATA_ASSIGNED);
  }

  ngOnInit(): void {
    this.getAllWork();
    this.getAllWorkIAssign();
    this.getAllWorkAssigned();
  }

  getAllWork(){
    this.ELEMENT_DATA = [];
    this.workService.getAll().subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          res.forEach((element: any, index: number) => {
            // const work: Work = {
            //   no: index,
            //   id: element.id,
            //   title: element.title,
            //   project: element.project.name,
            //   startDate: element.startDate,
            //   endDate: element.endDate,
            //   completeDate: element.completeDate,
            //   status: element.status,
            //   progress: element?.progress,
            //   assignUser: element.createdUser.firstName + " " + element.createdUser.lastName,
            //   assignedUser: element.assignUser.firstName + " " + element.assignUser.lastName,
            // };
            // if(work.status == 1){
            //   work.statusName = "Đã giao"
            //}

            const work = this.createWork(element, index);
            this.ELEMENT_DATA.push(work);
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

  getAllWorkIAssign(){
    this.ELEMENT_DATA_IASSIGN = [];
    this.workService.getAllWorkIAssign().subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          res.forEach((element: any, index: number) => {
            // const work: Work = {
            //   no: index,
            //   id: element.id,
            //   title: element.title,
            //   project: element.project.name,
            //   startDate: element.startDate,
            //   endDate: element.endDate,
            //   completeDate: element.completeDate,
            //   status: element.status,
            //   progress: element?.progress,
            //   assignUser: element.createdUser.firstName + " " + element.createdUser.lastName,
            //   assignedUser: element.assignUser.firstName + " " + element.assignUser.lastName,
            // };
            // if(work.status == 1){
            //   work.statusName = "Đã giao"
            // }
            const work = this.createWork(element, index);
            this.ELEMENT_DATA_IASSIGN.push(work);
          });
          this.dataSourceIAssign.data = this.ELEMENT_DATA_IASSIGN;
        }
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }

  createWork(element: any, index: number){
    const work: Work = {
      no: index,
      id: element.id,
      title: element.title,
      project: element.project.name,
      startDate: element.startDate,
      endDate: element.endDate,
      completeDate: element.completeDate,
      status: element.status,
      progress: element?.progress,
      assignUser: element.createdUser.firstName + " " + element.createdUser.lastName,
      assignedUser: element.assignUser.firstName + " " + element.assignUser.lastName,
    };
    if(work.status == 1){
      work.statusName = "Đã giao"
    }else if(work.status == 2){
      work.statusName = "Đang xử lý";
    }else if(work.status == 3){
      work.statusName = "Đang tạm dừng";
    }else if(work.status == 4){
      work.statusName = "Đã hoàn thành";
    }
    return work;
  }

  getAllWorkAssigned(){
    this.ELEMENT_DATA_ASSIGNED = [];
    this.workService.getAllWorkAssignedToMe().subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          res.forEach((element: any, index: number) => {
            // const work: Work = {
            //   no: index,
            //   id: element.id,
            //   title: element.title,
            //   project: element.project.name,
            //   startDate: element.startDate,
            //   endDate: element.endDate,
            //   completeDate: element.completeDate,
            //   status: element.status,
            //   progress: element?.progress,
            //   assignUser: element.createdUser.firstName + " " + element.createdUser.lastName,
            //   assignedUser: element.assignUser.firstName + " " + element.assignUser.lastName,
            // };
            // if(work.status == 1){
            //   work.statusName = "Đã giao"
            // }else if(work.status == 2){
            //   work.statusName = "Đang xử lý";
            // }else if(work.status == 3){
            //   work.statusName = "Đang tạm dừng";
            // }else if(work.status == 4){
            //   work.statusName = "Đã hoàn thành";
            // }
            const work = this.createWork(element, index);
            this.ELEMENT_DATA_ASSIGNED.push(work);
          });
          this.dataSourceAssigned.data = this.ELEMENT_DATA_ASSIGNED;
        }
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }

  openDialogDetail(id: number) {
    const dialogRef = this.dialog.open(DetailWorkComponent, {
      width: "60%",
      data: {id: id}
    });
  }

  openDialogUpdateProgress(taskId: number, progress: number){
    const dialogRef = this.dialog.open(DialogUpdateProgressComponent, {
      width: "35%",
      data: {id: taskId, progressInit: progress}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllWorkAssigned();
    });
  }
  openDialogUpdateStatus(taskId: number, status: number){
    const dialogRef = this.dialog.open(DialogUpdateStatusWorkComponent, {
      width: "35%",
      data: {id: taskId, statusInit: status}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllWorkAssigned();
    });
  }
}

export interface Work {
  no: number;
  id: string;
  title: string;
  project: string;
  startDate: string;
  endDate: string;
  completeDate: string;
  status: number;
  statusName?: string;
  progress?: number;
  assignUser: string;
  assignedUser: string;
}
