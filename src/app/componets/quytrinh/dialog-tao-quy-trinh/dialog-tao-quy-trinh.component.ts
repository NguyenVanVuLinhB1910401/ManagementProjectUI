import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { QuyTrinhService } from 'src/app/services/quy-trinh.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-dialog-tao-quy-trinh',
  templateUrl: './dialog-tao-quy-trinh.component.html',
  styleUrls: ['./dialog-tao-quy-trinh.component.scss']
})
export class DialogTaoQuyTrinhComponent {
  taoQuyTrinhForm!: FormGroup;
  taoBuocThucHienForm!: FormGroup;
  listCacBuocThucHien: any[] = [];
  listDepartment: any;
  listEmployeeByDepartment: any;
  //listMember = [];
  displayedColumns: string[] = ['no', 'tenBuoc', 'nguoiThucHien', 'tenBuocTruocDo', 'tenBuocTiepTheo', 'action'];
  dataSource: MatTableDataSource<BuocThucHien>;
  ELEMENT_DATA: BuocThucHien[] = [];
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogTaoQuyTrinhComponent>,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    //private projectService: ProjectService,
    private quyTrinhService: QuyTrinhService,
    private toast: NgToastService,
    private datePipe: DatePipe,
    private authService: AuthService
  ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit(): void {
    this.taoQuyTrinhForm = this.fb.group({
      id: [''],
      tenQuyTrinh: ['', Validators.required],
      ngayTao: [''],
      nguoiTaoId: ['']
    });
    this.taoBuocThucHienForm = this.fb.group({
      tenBuoc: ['', Validators.required],
      nguoiThucHienId: ['', Validators.required],
      departmentId: ['']
    });
    this.getAllDepartment();
    this.getAllEmployeeByDepartment("");
  }

  getAllDepartment(){
    this.listDepartment = [];
    this.departmentService.getAllDepartment().subscribe({
      next: (res: any) => {
        if(res?.length > 0){
          this.listDepartment = res;
        }
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }
  getAllEmployeeByDepartment(departmentId: string){
    this.listEmployeeByDepartment = [];
    if(departmentId === ""){
      this.employeeService.getAllEmployee().subscribe({
        next: (res: any) => {
          if(res?.length > 0){
            this.listEmployeeByDepartment = res;
          }
        },
        error: (err) => {
          //console.log(err);
          //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
        }
      })
    }else{
      this.employeeService.getEmployeeByDepartment(departmentId).subscribe({
        next: (res: any) => {
          if(res?.length > 0){
            this.listEmployeeByDepartment = res;
          }
        },
        error: (err) => {
          //console.log(err);
          //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
        }
      })
    }
  }

  onSubmit(){
    if(this.taoQuyTrinhForm.valid){
      const formObj = this.taoQuyTrinhForm.value;
      const currentDate = new Date();
      const data = {
        tenQuyTrinh: formObj.tenQuyTrinh,
        ngayTao: this.datePipe.transform(currentDate, 'yyyy-MM-dd') + 'T' + this.datePipe.transform(currentDate, 'HH:mm:ss') + '.000Z',
        ngayCapNhat: this.datePipe.transform(currentDate, 'yyyy-MM-dd') + 'T' + this.datePipe.transform(currentDate, 'HH:mm:ss') + '.000Z',
        nguoiTaoId: this.authService.getId(), //Cần lấy từ userLogin, dòng này đang bị lỗi
        buocThucHiens: this.listCacBuocThucHien
      }
      //console.log(data);
      
      this.quyTrinhService.taoQuyTrinh(data)
        .subscribe({
          next: (res) => {
            //console.log(res);
            //this.taoQuyTrinhForm.reset();
          
            this.toast.success({detail: "Thông báo", summary: res.message, duration: 5000, position: "topCenter"});
            //this.router.navigate(['dashboard']);
            this.onClose()
          },
          error: (err) => {
            //console.log(err);
            this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
          }
        })
    }else{
      ValidateForm.validateAllFormFields(this.taoQuyTrinhForm);
    }
  }
  onClose() {
    this.dialogRef.close();
  }

  taoBuocThucHien(){
    if(this.taoBuocThucHienForm.valid){
       //console.log(this.taoBuocThucHienForm.value);
      const formObj = this.taoBuocThucHienForm.value;
      const member = this.listEmployeeByDepartment.find((item: any) => item.id === formObj.nguoiThucHienId);
      //console.log(member); 
      const buoc: BuocThucHien = {
        no: 1,
        code: uuidv4(),
        tenBuoc: formObj.tenBuoc,
        nguoiThucHienId: formObj.nguoiThucHienId,
        nguoiThucHien: member.firstName + " " + member.lastName,
        buocTruocDo: "0",
        buocTiepTheo: "0",
        tenBuocTruocDo: "Không có",
        tenBuocTiepTheo: "Không có",
        
      };
      this.ELEMENT_DATA.push(buoc);
      //console.log(this.ELEMENT_DATA);
      this.capNhatBuoc(this.ELEMENT_DATA);
      this.ELEMENT_DATA = this.listCacBuocThucHien;
      this.dataSource.data = this.ELEMENT_DATA;
      this.taoBuocThucHienForm.reset();
    }else{
      ValidateForm.validateAllFormFields(this.taoBuocThucHienForm);
    }
  }


  capNhatBuoc(data: any) {
    this.listCacBuocThucHien = [];
    for (let i = 0; i < data.length; i++) {
      const buoc: BuocThucHien = {
        no: i,
        code: data[i].code,
        tenBuoc: data[i].tenBuoc,
        nguoiThucHienId: data[i].nguoiThucHienId,
        nguoiThucHien: data[i].nguoiThucHien,
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

  deleteAllBuocThucHien(){
    this.ELEMENT_DATA = [];
    this.dataSource.data = this.ELEMENT_DATA;
  }

  deleteBuocThucHien(i: number){
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter((item: any, index: number) => index !== i);
    this.dataSource.data = this.listCacBuocThucHien;
  }

  // changePosition($event: any, index: number){
  //     this.ELEMENT_DATA[index].position = $event.target.value;
  // }
}
export interface BuocThucHien {
  no: number;
  code: string;
  tenBuoc: string;
  nguoiThucHienId: string;
  nguoiThucHien: string;
  buocTruocDo: string;
  tenBuocTruocDo: string;
  buocTiepTheo: string;
  tenBuocTiepTheo: string;
}