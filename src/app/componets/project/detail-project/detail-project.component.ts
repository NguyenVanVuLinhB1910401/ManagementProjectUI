import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { DialogChuyenBuocTiepTheoComponent } from '../dialog-chuyen-buoc-tiep-theo/dialog-chuyen-buoc-tiep-theo.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogChuyenVeBuocTruocComponent } from '../dialog-chuyen-ve-buoc-truoc/dialog-chuyen-ve-buoc-truoc.component';
import { MatTableDataSource } from '@angular/material/table';
import { DetailWorkComponent } from '../../my-work/detail-work/detail-work.component';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss']
})
export class DetailProjectComponent implements OnInit {
  project: any;
  projectId: any;
  userId: any;
  displayedColumnsInfoMember: string[] = ['no', 'fullName', 'position', 'department', 'departmentPosition'];
  dataSourceInfoMember: MatTableDataSource<InfoMember>;
  ELEMENT_DATA_INFOMEMBER: InfoMember[] = [];
  displayedColumnsLichSuCongViec: string[] = ['no', 'title', 'tenNguoiGiao', 'tenNguoiThucHien', 'startDate', 'endDate', 'completeDate', 'status', 'progress', 'action'];
  dataSourceLichSuCongViec: MatTableDataSource<InfoMember>;
  ELEMENT_DATA_LICHSUCONGVIEC: InfoMember[] = [];
  listLichSuCongViec: any;
  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private toast: NgToastService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private authService: AuthService
  ){
    this.dataSourceInfoMember = new MatTableDataSource(this.ELEMENT_DATA_INFOMEMBER);
    this.dataSourceLichSuCongViec = new MatTableDataSource(this.ELEMENT_DATA_LICHSUCONGVIEC);
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.getDetailProject(this.projectId);
    this.userId = this.authService.getId(); // Cần sửa lỗi ở đây
    this.getInfoMember(this.projectId);
    this.getLichSuThucHien(this.projectId);
  }

  getDetailProject(id: string){
    this.projectService.getProjectDetail(id).subscribe({
      next: (res: any) => {
        this.project = res.project;
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }
  
  getInfoMember(projectId: string){
    this.projectService.getAllInfoByProject(projectId).subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          this.ELEMENT_DATA_INFOMEMBER = res.map((member: any) => {
            member.department = member.phongBan;
            member.departmentPosition = member.viTriTrongPhongBan;
            return member;
          });
          this.dataSourceInfoMember.data = this.ELEMENT_DATA_INFOMEMBER;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getLichSuThucHien(projectId: string){
    this.listLichSuCongViec = [];
    this.projectService.getLichSuThucHienCongViec(projectId).subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          res.forEach((element: any) => {
            element.nguoiGiaoViec = element?.createdUser;
            element.tenNguoiGiao = element.createdUser.firstName + " " + element.createdUser.lastName;
            element.nguoiThucHien = element?.assignUser;
            element.tenNguoiThucHien = element.assignUser.firstName + " " + element.assignUser.lastName;
            element.statusName = element.statusName;
            if(element.isChuyenBuoc === 1){
              this.listLichSuCongViec.push(element);
            }else{
              const indexFind = this.listLichSuCongViec.findIndex((work: any) => work.id === element.parentWorkId);
              if(indexFind != -1){
                this.listLichSuCongViec.splice(indexFind + 1, 0, element);
              }else{
                this.listLichSuCongViec.push(element);
              }
            }
          })
          this.ELEMENT_DATA_LICHSUCONGVIEC = this.listLichSuCongViec;
          console.log(this.ELEMENT_DATA_LICHSUCONGVIEC);
          
          this.dataSourceLichSuCongViec.data = this.ELEMENT_DATA_LICHSUCONGVIEC;
        }
      }
    })
  }

  openDialogChuyenBuocTiepTheo(id: string, name: string, buocTiepTheo: string){
    const dialogRef = this.dialog.open(DialogChuyenBuocTiepTheoComponent, {
      width: "60%",
      data: { id: id, projectName: name, buocTiepTheo: buocTiepTheo}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      
    });
  }

  openDialogChuyenVeBuocTruoc(id: string, name: string, buocTruocDo: string){
    const dialogRef = this.dialog.open(DialogChuyenVeBuocTruocComponent, {
      width: "60%",
      data: { id: id, projectName: name, buocTruocDo: buocTruocDo}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      
    });
  }

  openDialogDetail(id: number) {
    const dialogRef = this.dialog.open(DetailWorkComponent, {
      width: "60%",
      autoFocus: false,
      data: {id: id, type: 1}
    });
  }
}
 export interface InfoMember {
   memberId: string;
   projectId: string;
   fullName: string;
   position: string;
   department: string;
   departmentPosition: string;
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
  assignUser: any;
  assignedUser: any;
}
