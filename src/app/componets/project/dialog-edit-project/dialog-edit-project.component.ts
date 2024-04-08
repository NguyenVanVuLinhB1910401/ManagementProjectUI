import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dialog-edit-project',
  templateUrl: './dialog-edit-project.component.html',
  styleUrls: ['./dialog-edit-project.component.scss']
})
export class DialogEditProjectComponent {
  editProjectForm!: FormGroup;
  addMemberForm!: FormGroup;
  listDepartment: any;
  listEmployeeByDepartment: any;
  listMember = [];
  displayedColumns: string[] = ['no', 'fullName', 'position', 'action'];
  dataSource: MatTableDataSource<Employee>;
  ELEMENT_DATA: Employee[] = [];
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private toast: NgToastService,
    private datePipe: DatePipe,
  ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit(): void {
    this.editProjectForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      completeDate: ['']
    });
    this.addMemberForm = this.fb.group({
      departmentId: [''],
      memberIds: [[], Validators.required],
      position: ['', Validators.required]
    });
    this.getAllDepartment();
    this.getAllEmployeeByDepartment("");
    this.getProject(this.data.id);
  }

  getProject(id: string){
    this.projectService.getProject(id).subscribe({
      next: (res: any) => {
        this.editProjectForm.patchValue({
          id: res.id,
          name: res.name,
          address: res.address,
          type: res.type,
          startDate: res.startDate,
          endDate: res.endDate,
          completeDate: res.completeDate
        });
        if(res?.members?.length > 0){
          res.members.forEach((item: any) => {
            const member: Employee = {
              id: item.memberId,
              fullName: item.fullName,
              position: item.position
            }
            this.ELEMENT_DATA.push(member);
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

  getAllDepartment(){
    this.listDepartment = [];
    this.departmentService.getAllDepartment().subscribe({
      next: (res: any) => {
        if(res.length > 0){
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
    if(this.editProjectForm.valid){
      // console.log(this.editProjectForm.value);
      const formObj = this.editProjectForm.value;
      const data: any = {
        id: formObj.id,
        name: formObj.name,
        address: formObj.address,
        type: formObj.type,
        startDate: this.datePipe.transform(formObj.startDate, 'yyyy-MM-dd') + 'T00:00:00.000Z',
        endDate: this.datePipe.transform(formObj.endDate, 'yyyy-MM-dd') + 'T00:00:00.000Z',
        members: this.ELEMENT_DATA.map(e => {
          return {
            memberId: e.id,
            position: e.position
          }})
      }
      if(formObj.completeDate){
        data.completeDate = this.datePipe.transform(formObj.completeDate, 'yyyy-MM-dd') + 'T00:00:00.000Z';
      }
      
      //console.log(data);
      
      this.projectService.editProject(data)
        .subscribe({
          next: (res) => {
            //console.log(res);
            //this.editProjectForm.reset();
          
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
      ValidateForm.validateAllFormFields(this.editProjectForm);
    }
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmitAddMember(){
    if(this.addMemberForm.valid){
      // console.log(this.addMemberForm.value);
      const formObj = this.addMemberForm.value;
      const listMemberTmp = this.listEmployeeByDepartment.filter((item: any) => formObj.memberIds.includes(item.id));
      listMemberTmp.forEach((e: any) => {
        const member: Employee = {
          id: e.id,
          fullName: e.firstName + " " + e.lastName,
          position: formObj.position
        }
        this.ELEMENT_DATA.push(member);
      });
      this.dataSource.data = this.ELEMENT_DATA;
      this.addMemberForm.reset();
    }else{
      ValidateForm.validateAllFormFields(this.addMemberForm);
    }
  }

  deleteAllMember(){
    this.ELEMENT_DATA = [];
    this.dataSource.data = this.ELEMENT_DATA;
  }

  deleteMember(i: number){
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter((item: any, index: number) => index !== i);
    this.dataSource.data = this.ELEMENT_DATA;
  }

  changePosition($event: any, index: number){
    this.ELEMENT_DATA[index].position = $event.value;
  }
}

export interface Employee {
  id: string;
  fullName: string;
  position: string;
}

export interface DataDialog {
  id: string;
}
