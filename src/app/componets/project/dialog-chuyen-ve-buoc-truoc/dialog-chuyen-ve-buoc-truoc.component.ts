import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { BuocThucHienService } from 'src/app/services/buoc-thuc-hien.service';
import { ProjectService } from 'src/app/services/project.service';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-dialog-chuyen-ve-buoc-truoc',
  templateUrl: './dialog-chuyen-ve-buoc-truoc.component.html',
  styleUrls: ['./dialog-chuyen-ve-buoc-truoc.component.scss']
})
export class DialogChuyenVeBuocTruocComponent {
  createWorkForm!: FormGroup;
  addMemberForm!: FormGroup;
  listDepartment: any;
  listEmployeeByDepartment: any;
  listMember = [];
  listInfoMemberByProject: any;
  selectedFiles: any[] = [];
  displayedColumns: string[] = ['no', 'fullName', 'position', 'action'];
  dataSource: MatTableDataSource<Employee>;
  ELEMENT_DATA: Employee[] = [];
  isClick: boolean = false;
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogChuyenVeBuocTruocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private projectService: ProjectService,
    private workService: WorkService,
    private toast: NgToastService,
    private datePipe: DatePipe,
    private buocThucHienService: BuocThucHienService
  ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit(): void {
    this.createWorkForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      content: ['', Validators.required],
      //assignUserId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
      
    });
    this.addMemberForm = this.fb.group({
      departmentId: [''],
      memberIds: [[], Validators.required],
      position: ['', Validators.required]
    });
    this.getAllInfoMemberByProject(this.data.id);
    this.getBuocTruocDo(this.data.buocTruocDo);
  }

  getBuocTruocDo(code: string){
    this.buocThucHienService.getBuocByCode(code).subscribe({
      next: (res: any) => {
        this.createWorkForm.patchValue({
          title: res.tenBuoc
        });
      },
      error: (err) => {
        //console.log(err);
        //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    })
  }


  getAllInfoMemberByProject(projectId: string){
    this.listInfoMemberByProject = [];
    this.projectService.getAllInfoByProject(projectId).subscribe({
        next: (res: any) => {
          if(res?.length > 0){
            this.listInfoMemberByProject = res;
          }
        },
        error: (err) => {
          //console.log(err);
          //this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
        }
      })
  }

  onSubmit(){
    if(this.createWorkForm.valid){
      //this.isClick = true;
      // console.log(this.createWorkForm.value);
      const formObj = this.createWorkForm.value;
      if(formObj.startDate <= formObj.endDate){
      const formData = new FormData();
      const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      formData.append("id", "123");
      formData.append("title", formObj.title);
      formData.append("content", formObj.content);
      formData.append("startDate", this.datePipe.transform(formObj.startDate, 'yyyy-MM-dd') + 'T00:00:00.000Z');
      formData.append("endDate", this.datePipe.transform(formObj.endDate, 'yyyy-MM-dd') + 'T23:59:59.999Z');
      //formData.append("assignUserId", formObj.assignUserId);
      formData.append("created", currentDate!.toString());
      formData.append("projectId", this.data.id);
      if(this.selectedFiles.length > 0){
        for(let i = 0; i < this.selectedFiles.length; i++){
          formData.append("attachmentFiles", this.selectedFiles[i]);
        }
      }
    
      //console.log(data);
      
      this.workService.quayLaiBuocTruoc(formData)
        .subscribe({
          next: (res: any) => {
            //console.log(res);
            //this.createWorkForm.reset();
          
            this.toast.success({detail: "Thông báo", summary: res.message, duration: 5000, position: "topCenter"});
            //this.router.navigate(['dashboard']);
            //this.isClick = false;
            this.onClose();
          },
          error: (err) => {
            //console.log(err);
            //this.isClick = false;
            this.toast.error({detail: "Thông báo", summary: "Quay lại bước trước đó thất bại", duration: 5000, position: "topCenter"});
          }
        })
      }else{
        this.toast.warning({detail: "Thông báo", summary: "Ngày kết thúc phải sau ngày bắt đầu", duration: 5000, position: "topCenter"})
      }
    }else{
      ValidateForm.validateAllFormFields(this.createWorkForm);
    }
  }
  onClose() {
    this.dialogRef.close();
  }


  selectFiles(event: any){
    for (var i = 0; i < event.target.files.length; i++) { 
      this.selectedFiles.push(event.target.files[i]);
    }
    // this.selectedFiles.push(event.target.files);
  }
    
    
  
  removeFile(index: number){
    this.selectedFiles = this.selectedFiles.map((e: any, i: number) => i !== index)
  }
  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  deleteAllFileSelected(){
    this.selectedFiles = [];
  }
  deleteFileSelected(index: number){
    this.selectedFiles.splice(index, 1);
  }
}
export interface Employee {
  no: number;
  id: string;
  fullName: string;
  position: string;
}

export interface DataDialog {
  id: string;
  projectName: string;
  buocTruocDo: string;
}