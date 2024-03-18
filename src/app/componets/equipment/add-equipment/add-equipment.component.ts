import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { EquipmentTypeService } from 'src/app/services/equipment-type.service';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent implements OnInit {
  // public resetPasswordEmail!: string;
  // public isValidEmail!: boolean;  
  addEquipmentForm!: FormGroup;
  equipmentTypes: any;
  @Output() addEquipmentEvent = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder, 
    private equipmentTypeService: EquipmentTypeService,
    private equipmentService: EquipmentService,
    private toast: NgToastService
    ){}

  ngOnInit(): void {
    this.addEquipmentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      equipmentTypeId: ['', Validators.required]
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

  addEquipment(){
    if(this.addEquipmentForm.valid){
      //console.log(this.addEquipmentForm.value);
      this.equipmentService.addEquipment(this.addEquipmentForm.value)
        .subscribe({
          next: (res) => {
            //console.log(res.equipment);
            //res.equipment.equipmentType = this.equipmentTypes.find((equipmentType : any) => equipmentType.equipmentTypeId === res.equipment.equipmentTypeId);
            this.addEquipmentEvent.emit({ success: true, message: res.message, equipment: res.equipment });
            this.addEquipmentForm.reset();
            const buttonRef = document.getElementById("closeBtn");
            buttonRef?.click();
          },
          error: (err) => {
            //console.log(err);
            this.addEquipmentEvent.emit({ success: false, message: err.error.message });
          }
        })
    }else{
      ValidateForm.validateAllFormFields(this.addEquipmentForm);
    }
  }
}
