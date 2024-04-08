import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { QuyTrinhService } from 'src/app/services/quy-trinh.service';

@Component({
  selector: 'app-dialog-xem-chi-tiet',
  templateUrl: './dialog-xem-chi-tiet.component.html',
  styleUrls: ['./dialog-xem-chi-tiet.component.scss']
})
export class DialogXemChiTietComponent {
  quyTrinh: any;
  listCacBuocThucHien: any[] = [];
  displayedColumns: string[] = ['no', 'tenBuoc', 'nguoiThucHien', 'tenBuocTruocDo', 'tenBuocTiepTheo'];
  dataSource: MatTableDataSource<BuocThucHien>;
  ELEMENT_DATA: BuocThucHien[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogXemChiTietComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private quyTrinhService: QuyTrinhService,
    private toast: NgToastService,
    private datePipe: DatePipe,
  ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit(): void {
    this.getDetailQuyTrinh(this.data.id);
  }

  getDetailQuyTrinh(id: number){
    this.quyTrinhService.getQuyTrinh(id).subscribe({
      next: (res: any) => {
        this.quyTrinh = res;
        this.capNhatBuoc(this.quyTrinh?.buocThucHiens);
        this.ELEMENT_DATA = this.listCacBuocThucHien;
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }

  onClose() {
    this.dialogRef.close();
  }
  capNhatBuoc(data: any) {
    this.listCacBuocThucHien = [];
    for (let i = 0; i < data.length; i++) {
      const buoc: BuocThucHien = {
        no: i,
        id: data[i].id,
        code: data[i].code,
        tenBuoc: data[i].tenBuoc,
        nguoiThucHienId: data[i].nguoiThucHienId,
        nguoiThucHien: data[i].nguoiThucHien.firstName + " " + data[i].nguoiThucHien.lastName,
        buocTruocDo: data[i].buocTruocDo,
        buocTiepTheo: data[i].buocTiepTheo,
        tenBuocTruocDo: data[i].tenBuocTruocDo,
        tenBuocTiepTheo: data[i].tenBuocTiepTheo,
      }
      if (i > 0) {
        buoc.buocTruocDo = data[i - 1].code;
        buoc.tenBuocTruocDo = data[i - 1].tenBuoc;
      }
      if (i < data.length - 1) {
        buoc.buocTiepTheo = data[i + 1].code;
        buoc.tenBuocTiepTheo = data[i + 1].tenBuoc;
      }
      this.listCacBuocThucHien.push(buoc);
    }
  }
}

export interface BuocThucHien {
  no: number;
  id: string;
  code: string;
  tenBuoc: string;
  nguoiThucHienId: string;
  nguoiThucHien: string;
  buocTruocDo: string;
  tenBuocTruocDo: string;
  buocTiepTheo: string;
  tenBuocTiepTheo: string;
}
export interface DataDialog {
  id: number;
}
