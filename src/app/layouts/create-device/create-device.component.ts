import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Class } from 'src/app/Models/class';
import { Devices } from 'src/app/Models/devices';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import { DeviceServiceService } from 'src/app/services/device-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit {
  classDevices :Devices|any ;
  submitted = false;
  modalRef: any;
  createDeviceForm: Devices | any;
  createDeviceFormGroup: FormGroup = new FormGroup({
    deviceReference: new FormControl('', Validators.required),
    deviceBrand: new FormControl('', Validators.required),
    className: new FormControl('', Validators.required),
    note: new FormControl(''),
    classId: new FormControl('', Validators.required),
  });
  
  constructor(private translateservice: TranslateService, private deviceservice: DeviceServiceService,
    private router: Router, public activeModal: NgbActiveModal,
    private classeservice:ClasseServiceService
  ) {
    this.translateservice.setDefaultLang('ar');
    this.createDeviceForm = {
      reference: '',
      brand: '',
      note: '',
      classId:''
    },
    this.getAllClasses()
  }

  //create new device
  createDevice(): void {
    this.submitted = true
    if (this.createDeviceFormGroup.valid) {
      this.createDeviceForm.reference = this.createDeviceFormGroup.get('deviceReference')?.value;
      this.createDeviceForm.brand = this.createDeviceFormGroup.get('deviceBrand')?.value;
      this.createDeviceForm.note = this.createDeviceFormGroup.get('note')?.value;
      this.createDeviceForm.classId = this.createDeviceFormGroup.get('classId')?.value;
      console.log("form", this.createDeviceForm)

     
      this.deviceservice.addDevice(this.createDeviceForm).subscribe({
        next: (data) => {
          console.log('data device', data);
          if (data)
            Swal.fire({
              text: 'لقد تم إضافة الجهاز بنجاح .',
              icon: 'success',
              confirmButtonColor: '#2ECC71',
              confirmButtonText: 'حسنًا',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()
              }
            });
        },
        error: (err) => {
          if (err.status == 500) {
            Swal.fire({
              text: 'تأكد من صحة البيانات !!',
              icon: 'error',
              confirmButtonText: 'حسنًا',
              confirmButtonColor: '#E74C3C',
            });
          }
        }
      });
    }
  }
  get formControl(): { [key: string]: AbstractControl } {
    return this.createDeviceFormGroup.controls;
  }
  //close modal function
  closeModal() {
    this.activeModal.dismiss()
  }
  //on reset function
  onReset(event:Event): void {
      this.submitted = false;
    event.preventDefault()
    this.createDeviceFormGroup.reset()
  }

  //get all classes
  getAllClasses():void{
    this.classeservice.getAllClasses().subscribe((data:Class[])=>{
      console.log("datta",data)
      this.classDevices = data;

    })
  }

  onClassSelect(event: any): void {
    const selectedClassId = event.target.value;
    const selectedClass = this.classDevices.find((classDevice: Class) => classDevice._id === selectedClassId);
    
    if (selectedClass) {
      this.createDeviceFormGroup.get('classId')?.setValue(selectedClass._id);
    }
  }
  
  ngOnInit(): void {
  }
}
