import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { WorkService } from 'src/app/services/work.service';
import { DetailWorkComponent } from '../detail-work/detail-work.component';
import { DialogUpdateStatusWorkComponent } from '../dialog-update-status-work/dialog-update-status-work.component';
import { DialogUpdateProgressComponent } from '../dialog-update-progress/dialog-update-progress.component';

@Component({
  selector: 'app-cong-viec-duoc-giao',
  templateUrl: './cong-viec-duoc-giao.component.html',
  styleUrls: ['./cong-viec-duoc-giao.component.scss']
})
export class CongViecDuocGiaoComponent implements OnInit{
  displayedColumnsAssigned: string[] = ['no', 'title', 'project', 'assignUser', 'assignedUser', 'startDate', 'endDate', 'completeDate', 'status', 'progress', 'action'];
  dataSourceAssigned: MatTableDataSource<Work>;
  ELEMENT_DATA_ASSIGNED: Work[] = [];

  constructor(
    private dialog: MatDialog,
    private toast: NgToastService,
    private workService: WorkService
    ){
    this.dataSourceAssigned = new MatTableDataSource(this.ELEMENT_DATA_ASSIGNED);
  }

  ngOnInit(): void {
    this.getAllWorkAssigned();
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

  openDialogDetail(id: number) {
    const dialogRef = this.dialog.open(DetailWorkComponent, {
      width: "60%",
      autoFocus: false,
      data: {id: id, type: 2}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      //this.getAllWorkAssigned();
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