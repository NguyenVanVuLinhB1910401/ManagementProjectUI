import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AttachmentFileService } from 'src/app/services/attachment-file.service';
import { WorkService } from 'src/app/services/work.service';
import { DialogChuyenBuocTiepTheoComponent } from '../../project/dialog-chuyen-buoc-tiep-theo/dialog-chuyen-buoc-tiep-theo.component';
import { AuthService } from 'src/app/services/auth.service';
import { DialogChuyenVeBuocTruocComponent } from '../../project/dialog-chuyen-ve-buoc-truoc/dialog-chuyen-ve-buoc-truoc.component';
import { Subscription } from 'rxjs';
import { DialogCreateWorkComponent } from '../../join-project/dialog-create-work/dialog-create-work.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detail-work',
  templateUrl: './detail-work.component.html',
  styleUrls: ['./detail-work.component.scss']
})
export class DetailWorkComponent implements OnInit, OnDestroy {
  work: any;
  listSubwork: any;
  isAllowNext:boolean = false;
  isAllowPrevious:boolean = false;
  userIdLogin = '';
  userLogin: any;
  private userLoginSub: Subscription = new Subscription();
  displayedColumnsSubwork: string[] = ['no', 'title', 'assignedUser', 'startDate', 'endDate', 'completeDate', 'status', 'progress', 'action'];
  dataSourceSubwork: MatTableDataSource<Work>;
  ELEMENT_DATA_SUBWORK: Work[] = [];
  isShowTableSubwork: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DetailWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private workService: WorkService,
    private attachmentFileService: AttachmentFileService,
    private toast: NgToastService,
    private dialog: MatDialog,
    private authService: AuthService
  ){
    this.dataSourceSubwork = new MatTableDataSource(this.ELEMENT_DATA_SUBWORK);
  }
  ngOnInit(): void {
    this.userLoginSub = this.authService.userLogin$.subscribe(value => {
      this.userLogin = value;
    });
    this.getWork(this.data.id);
    this.userIdLogin = this.authService.getId();
  }
  
  getWork(id: number) {
    this.work = "";
    this.isAllowNext = false;
    this.isAllowPrevious = false;
    this.workService.getWork(id).subscribe({
      next: (res: any) => {
        this.getAllSubwork(res?.id);
        this.work = res;
        if(this.work.status == 1){
          this.work.statusName = "Đã giao"
        }else if(this.work.status == 2){
          this.work.statusName = "Đang xử lý";
        }else if(this.work.status == 3){
          this.work.statusName = "Đang tạm dừng";
        }else if(this.work.status == 4){
          this.work.statusName = "Đã hoàn thành";
        }
        console.log(this.userLogin?.Id );
        console.log(this.work?.project?.buocHienTai?.nguoiThucHienId);
        
        if(this.userLogin?.Id === this.work?.project?.buocHienTai?.nguoiThucHienId && this.work?.isChuyenBuoc === 1 && this.work?.project?.buocHienTai?.buocTiepTheo !== '0') this.isAllowNext = true;
        if(this.userLogin?.Id === this.work?.project?.buocHienTai?.nguoiThucHienId && this.work?.isChuyenBuoc === 1 && this.work?.project?.buocHienTai?.buocTruocDo !== '0') this.isAllowPrevious = true;
       
        
      },
      error: (err) => {
        //console.log(err);
        this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }

  getAllSubwork(parentWorkId: number) {
    this.listSubwork = [];
    this.isShowTableSubwork = false;
    this.workService.getAllSubWork(parentWorkId).subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          this.isShowTableSubwork = true;
          res.forEach((element: any, index: number) => {
            const work = this.createWork(element, index);
            this.ELEMENT_DATA_SUBWORK.push(work);
          });
          this.dataSourceSubwork.data = this.ELEMENT_DATA_SUBWORK;
        }
      },
      error: (err) => {
        //console.log(err);
        this.isShowTableSubwork = false;
        this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }

  createWork(element: any, index: number){
    const work: Work = {
      no: index,
      id: element.id,
      title: element.title,
      startDate: element.startDate,
      endDate: element.endDate,
      completeDate: element.completeDate,
      status: element.status,
      progress: element?.progress,
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

  onClose() {
    this.dialogRef.close();
  }

  downloadFile(filePath: string, fileName: string){
    this.attachmentFileService.getFile(filePath).subscribe(
      data => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName; // Tên file mà bạn muốn lưu
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading the file', error);
      }
    );
  }

  downloadAllFiles(workId: number, zipFileName: string) {
    this.attachmentFileService.getAllFiles(workId).subscribe(
      data => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = this.formatFileName(zipFileName) + ".zip"; // Tên file ZIP mà bạn muốn lưu
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading the files', error);
      }
    );
  }

  formatFileName(fileName: string): string {
    // Xóa dấu và thay đổi dấu cách thành dấu -
    return fileName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
  }

  openDialogChuyenBuocTiepTheo(id: string, name: string, buocTiepTheo: string){
    const dialogRef = this.dialog.open(DialogChuyenBuocTiepTheoComponent, {
      width: "60%",
      data: { id: id, projectName: name, buocTiepTheo: buocTiepTheo}
    });
    this.onClose();
    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(`Dialog result: ${result}`);
    //   this.getWork(this.data.id);
    // });
  }

  openDialogChuyenVeBuocTruoc(id: string, name: string, buocTruocDo: string){
    const dialogRef = this.dialog.open(DialogChuyenVeBuocTruocComponent, {
      width: "60%",
      data: { id: id, projectName: name, buocTruocDo: buocTruocDo}
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(`Dialog result: ${result}`);
      
    // });
    this.onClose();
  }

  openDialogGiaoViecChoThanhVien(id: string, name: string) {
    const dialogRef = this.dialog.open(DialogCreateWorkComponent, {
      width: "60%",
      data: { id: id, projectName: name, parentWorkId: this.work?.id}
    });
    this.onClose();
    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(`Dialog result: ${result}`);
    //   //this.getAllProjectJoined();
    // });
  }
  
  openDialogDetail(id: number) {
    const dialogRef = this.dialog.open(DetailWorkComponent, {
      width: "60%",
      autoFocus: false,
      data: {id: id, type: 1}
    });
  }

  ngOnDestroy(): void {
    this.userLoginSub.unsubscribe();
  }

  
}

export interface DataDialog {
  id: number;
  type: number; // type = 1 - Công việc đã giao; type = 2 - Công việc được giao; 
}

export interface Work {
  no: number;
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  completeDate: string;
  status: number;
  statusName?: string;
  progress?: number;
  assignedUser: string;
}

