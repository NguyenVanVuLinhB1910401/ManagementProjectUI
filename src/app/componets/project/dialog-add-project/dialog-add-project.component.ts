import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.scss']
})
export class DialogAddProjectComponent {
  addProjectForm!: FormGroup;
  addMemberForm!: FormGroup;
  listDepartment: any;
  listEmployeeByDepartment: any;
  listMember = [];
  displayedColumns: string[] = ['no', 'fullName', 'position', 'action'];
  dataSource: MatTableDataSource<Employee>;
  ELEMENT_DATA: Employee[] = [];
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogAddProjectComponent>,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private toast: NgToastService,
    private datePipe: DatePipe,
  ){
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit(): void {
    this.addProjectForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.addMemberForm = this.fb.group({
      departmentId: [''],
      memberIds: [[], Validators.required],
      position: ['', Validators.required]
    });
    this.getAllDepartment();
    this.getAllEmployeeByDepartment("");
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
    if(this.addProjectForm.valid){
      // console.log(this.addProjectForm.value);
      const formObj = this.addProjectForm.value;
      const data = {
        id: '',
        name: formObj.name,
        address: formObj.address,
        type: formObj.type,
        startDate: this.datePipe.transform(formObj.startDate, 'yyyy-MM-dd') + 'T00:00:00.000Z',
        endDate: this.datePipe.transform(formObj.endDate, 'yyyy-MM-dd') + 'T00:00:00.000Z',
        members: this.ELEMENT_DATA.map(e => {
          return {
            memberId: e.id,
            position: e.position
          }
        })
      }
      //console.log(data);
      
      this.projectService.addProject(data)
        .subscribe({
          next: (res) => {
            //console.log(res);
            //this.addProjectForm.reset();
          
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
      ValidateForm.validateAllFormFields(this.addProjectForm);
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
          no: 0,
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
      this.ELEMENT_DATA[index].position = $event.target.value;
  }
}
export interface Employee {
  no: number;
  id: string;
  fullName: string;
  position: string;
}