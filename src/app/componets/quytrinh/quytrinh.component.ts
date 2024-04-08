import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ProjectService } from 'src/app/services/project.service';
import { DialogTaoQuyTrinhComponent } from './dialog-tao-quy-trinh/dialog-tao-quy-trinh.component';
import { QuyTrinhService } from 'src/app/services/quy-trinh.service';
import { DialogXoaQuyTrinhComponent } from './dialog-xoa-quy-trinh/dialog-xoa-quy-trinh.component';
import { DialogXemChiTietComponent } from './dialog-xem-chi-tiet/dialog-xem-chi-tiet.component';

@Component({
  selector: 'app-quytrinh',
  templateUrl: './quytrinh.component.html',
  styleUrls: ['./quytrinh.component.scss']
})
export class QuytrinhComponent {
  displayedColumns: string[] = ['no', 'tenQuyTrinh', 'nguoiTao', 'createdDate', 'action'];
  dataSource: MatTableDataSource<QuyTrinh>;
  ELEMENT_DATA: QuyTrinh[] = [];
  constructor(
    private dialog: MatDialog,
    private toast: NgToastService,
    private quyTrinhService: QuyTrinhService
    ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit(): void {
    this.getAllQuyTrinh();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogTaoQuyTrinhComponent, {
      width: "90%",
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllQuyTrinh();
    });
  }

  getAllQuyTrinh(){
    this.ELEMENT_DATA = [];
    this.quyTrinhService.getAllQuyTrinh().subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          res.forEach((element: any, index: number) => {
            const quyTrinh: QuyTrinh = {
              no: index,
              id: element.id,
              tenQuyTrinh: element.tenQuyTrinh,
              //countBuocThucHien: element.countBuocThucHien,
              nguoiTao: element?.nguoiTao?.firstName + " " + element?.nguoiTao?.lastName,
              nguoiTaoId: element?.nguoiTao?.id,
              createdDate: element.ngayTao,
              updatedDate: element.updatedDate,
              projectId: element.projectId
            };
          
            this.ELEMENT_DATA.push(quyTrinh);
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
 
  openDialogDetail(id: string) {
    const dialogRef = this.dialog.open(DialogXemChiTietComponent, {
      width: "80%",
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      //this.getAllProject();
    });
  }

  openDialogDelete(id: string, name: string) {
    const dialogRef = this.dialog.open(DialogXoaQuyTrinhComponent, {
      width: "30%",
      autoFocus: false,
      data: {id: id, name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllQuyTrinh();
    });
  }
}


export interface QuyTrinh {
  no: number;
  id: number;
  tenQuyTrinh: string;
  // countBuocThucHien: number;
  nguoiTao: string;
  nguoiTaoId: string;
  createdDate: string;
  updatedDate: string;
  projectId: string;
}