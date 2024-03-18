import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { EquipmentService } from 'src/app/services/equipment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users: any;
  assignEquipmentForm!: FormGroup;
  employeeId: string ='';
  listEquipment: string[] = [];
  constructor(
    private userService: UserService, 
    private toast: NgToastService,
    private fb: FormBuilder,
    private equipmentService: EquipmentService){}
  ngOnInit(): void {
    this.assignEquipmentForm = this.fb.group({
      equipmentId: ['', Validators.required],
    });
    this.getUserList();
  }

  getUserList(){
    this.userService.getAll()
    .subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  setEmployeeAssign(id: string){
   //console.log(id);
   this.employeeId = id;

  }
  addListEquipment(){
    if(this.assignEquipmentForm.valid){
      this.listEquipment.push(this.assignEquipmentForm.value.equipmentId);
      this.assignEquipmentForm.reset();
    }else{
      ValidateForm.validateAllFormFields(this.assignEquipmentForm);
    }
  }
  deleteEquipment(e: string){
    this.listEquipment = this.listEquipment.filter(eq => eq !== e);
  }

  submitAssignEquipment(){
    if(this.employeeId && this.listEquipment.length > 0){
      this.equipmentService.assignEquipment({employeeId: this.employeeId, listEquipment: this.listEquipment})
      .subscribe({
        next: (res) => {
          this.assignEquipmentForm.reset();
          this.employeeId = '';
          this.listEquipment = [];
          var btnRef = document.getElementById("closeBtnAssign");
          btnRef?.click();
          this.toast.success({detail: "SUCCESS", summary: "Assign Equipment Successfully", duration: 5000, position: "topCenter"});
        },
        error: (err) => {
          console.log(err); 
          this.toast.error({detail: "ERROR", summary: err.error.message, duration: 5000, position: "topCenter"});
        }
      })
    }
  }

  setEmployeeReturn(id: string){
    this.employeeId = id;
    this.userService.getAllEquipmentAssigned(id)
    .subscribe({
      next: (res) => {
        //console.log(res);
        this.listEquipment = [];
        res?.forEach((e: any) => {
          this.listEquipment.push(e.equipmentId);
        });
      },
      error: (err) => {

      }
    })
  }
  submitReturnEquipment(){
    if(this.employeeId && this.listEquipment.length > 0){
      this.equipmentService.returnEquipment({listEquipmentId: this.listEquipment})
      .subscribe({
        next: (res) => {
          this.employeeId = '';
          this.listEquipment = [];
          var btnRef = document.getElementById("closeBtnReturn");
          btnRef?.click();
          this.toast.success({detail: "SUCCESS", summary: "Return Equipment Successfully", duration: 5000, position: "topCenter"});
        },
        error: (err) => {
          console.log(err); 
          this.toast.error({detail: "ERROR", summary: err.error.message, duration: 5000, position: "topCenter"});
        }
      })
    }
  }

}
