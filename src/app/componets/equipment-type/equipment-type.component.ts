import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { EquipmentTypeService } from 'src/app/services/equipment-type.service';

@Component({
  selector: 'app-equipment-type',
  templateUrl: './equipment-type.component.html',
  styleUrls: ['./equipment-type.component.scss']
})
export class EquipmentTypeComponent implements OnInit {
  equipmentTypes: any;
  addEquipmentTypeForm!: FormGroup;
  editEquipmentTypeForm!: FormGroup;
  constructor(private equipmentTypeService: EquipmentTypeService, 
    private toast: NgToastService, 
    private fb: FormBuilder,
    ){}

  ngOnInit(): void {
    this.addEquipmentTypeForm = this.fb.group({
       name: ['', Validators.required]
    });
    this.editEquipmentTypeForm = this.fb.group({
      equipmentTypeId: ['', Validators.required],
      name: ['', Validators.required]
    });
    this.getEquipmentTypeList();
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

  getEquipmentType(id: string){
    this.equipmentTypeService.getEquipment(id)
    .subscribe({
      next: (res) => {
        this.editEquipmentTypeForm.setValue({ equipmentTypeId: res.equipmentTypeId, name: res.name });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addEquipmentType(){
    if(this.addEquipmentTypeForm.valid){
      //console.log(this.addEquipmentForm.value);
      this.equipmentTypeService.addEquipmentType(this.addEquipmentTypeForm.value)
        .subscribe({
          next: (res) => {
            //console.log(res);
            this.equipmentTypes.push(res.equipmentType);
            this.addEquipmentTypeForm.reset();
            const buttonRef = document.getElementById("closeBtn");
            buttonRef?.click();
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000, position: "topCenter"});
          },
          error: (err) => {
            //console.log(err);
            this.toast.error({ detail: "ERROR", summary: err.error.message, duration: 5000, position: "topCenter"});
          }
        });
    }else{
      ValidateForm.validateAllFormFields(this.addEquipmentTypeForm);
    }
  }

  editEquipmentType(){
    if(this.editEquipmentTypeForm.valid){
      //console.log(this.editEquipmentTypeForm.value.equipmentTypeId);
      this.equipmentTypeService.updateEquipmentType(this.editEquipmentTypeForm.value.equipmentTypeId, this.editEquipmentTypeForm.value)
        .subscribe({
          next: (res) => {
            //console.log(res);
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000, position: "topCenter"});
            this.editEquipmentTypeForm.reset();
            const buttonRef = document.getElementById("closeBtnEdit");
            buttonRef?.click();
            
            this.getEquipmentTypeList();
          },
          error: (err) => {
            //console.log(err);
            this.toast.error({ detail: "ERROR", summary: err.error.message, duration: 5000, position: "topCenter"});
          }
        });
    }else{
      ValidateForm.validateAllFormFields(this.editEquipmentTypeForm);
    }
  }

  deleteEquipmentType(id: string) {
    if(window.confirm(`Are you sure?`)){
      this.equipmentTypeService.deleteEquipmentType(id)
    .subscribe({
      next: (res) => {
        this.toast.success({ detail: "SUCCESS", summary: "Equipment Type is deleted.", duration: 5000, position: "topCenter"});
        this.equipmentTypes = this.equipmentTypes.filter((eq: any) => eq.equipmentTypeId !== id);
      },
      error: (err) => {
        console.log(err);
        this.toast.error({ detail: "ERROR", summary: err.error.message, duration: 5000, position: "topCenter"});
      }
    });
    }
  }
}
