import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { EquipmentTypeService } from 'src/app/services/equipment-type.service';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.scss']
})
export class ListEquipmentComponent implements OnInit {
  equipments: any = [];
  equipmentTypes: any;
  editEquipmentForm!: FormGroup;
  constructor(
    private equipmentService: EquipmentService, 
    private toast: NgToastService,
    private fb: FormBuilder,
    private equipmentTypeService: EquipmentTypeService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.editEquipmentForm = this.fb.group({
      equipmentId: ['', Validators.required],
      name: ['', Validators.required],
      equipmentTypeId: ['', Validators.required],
      description: ['']
    });
    this.getEquipmentList();
    this.getEquipmentTypeList();
  }

  getEquipmentList(){
    this.equipmentService.getAll()
    .subscribe({
      next: (res) => {
        this.equipments = res;
        //console.log(this.equipments);
      },
      error: (err) => {
        //console.log(err);
      }
    });
  }

  addEquipment(response: any) {
    //console.log(response);
    if (response.success) {
      // Nếu thêm người dùng thành công
      this.toast.success({ detail: "SUCCESS", summary: response.message, duration: 5000});
      // Cập nhật danh sách người dùng nếu có thêm tính năng hiển thị danh sách
      // this.userList.push(newUser);
      // this.equipments.push(response.equipment);
      this.getEquipmentList();
    } else {
      // Nếu thêm người dùng thất bại
      this.toast.error({ detail: "ERROR", summary: response.message, duration: 5000});
    }
  }

  deleteEquipment(id: string) {
    if(window.confirm(`Are you sure?`)){
      this.equipmentService.deleteEquipment(id)
    .subscribe({
      next: (res) => {
        this.equipments = this.equipments.filter((eq: any) => eq.equipmentId !== id);
        this.toast.success({ detail: "SUCCESS", summary: "Equipment is deleted.", duration: 5000, position: "topCenter"});
      },
      error: (err) => {
        console.log(err);
        this.toast.error({ detail: "ERROR", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    });
    }
  }

  getEquipmentTypeList(){
    this.equipmentTypeService.getAll()
    .subscribe({
      next: (res) => {
        this.equipmentTypes = res;
        //console.log(this.equipmentTypes);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  getEquipment(equipmentId: string){
    this.equipmentService.getEquipment(equipmentId)
    .subscribe({
      next: (res) => {
        this.editEquipmentForm.setValue({ equipmentId: res.equipmentId, name: res.name, equipmentTypeId: res.equipmentTypeId, description: res.description });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editEquipment(){
    if(this.editEquipmentForm.valid){
      //console.log(this.editEquipmentForm.value);
      this.equipmentService.updateEquipment(this.editEquipmentForm.value.equipmentId, this.editEquipmentForm.value)
        .subscribe({
          next: (res) => {
            this.editEquipmentForm.reset();
            const buttonRef = document.getElementById("closeBtnEditEquipment");
            buttonRef?.click();
            this.toast.success({ detail: "SUCCESS", summary: "Equipment is updated.", duration: 5000, position: "topCenter"});
            this.getEquipmentList();
          },
          error: (err) => {
            console.log(err);
            this.toast.error({ detail: "ERROR", summary: err.error.message, duration: 5000, position: "topCenter"});

          }
        });
    }else{
      ValidateForm.validateAllFormFields(this.editEquipmentForm);
    }
  }
  directHistory(id: string){
    this.router.navigate(['/equipment/historyequipment/', id]);
  }
}
