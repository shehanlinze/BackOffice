import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Class } from 'src/app/Models/class';
import { Devices } from 'src/app/Models/devices';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import { DeviceServiceService } from 'src/app/services/device-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-device-update',
  templateUrl: './device-update.component.html',
  styleUrls: ['./device-update.component.scss']
})
export class DeviceUpdateComponent  implements OnInit{

  id='';
  submitted = false;
  modalRef: any;
  updateDeviceForm: Devices | any;
  updateDeviceFormGroup: FormGroup 
  classDevices: Class|any;
  constructor(private translateservice:TranslateService,private formbuilder:FormBuilder,
    private activatedrouter:ActivatedRoute,private deviceservice:DeviceServiceService,
    private modalservice:NgbModal,private router:Router,private classeservice:ClasseServiceService){
      this.translateservice.setDefaultLang('ar');
      this.updateDeviceForm={
        reference:'',
        brand:'',
        note:'',
        classId:''
      }
      this.activatedrouter.queryParams.subscribe((Data)=>{
        this.id=Data['id']
        console.log("data id is:",this.id)
      });
      this.updateDeviceFormGroup = this.formbuilder.group({
        deviceReference: ['', Validators.required],
        deviceBrand: ['', Validators.required],
        note: [''],
        classId: ['', Validators.required],

      });
    }

    //affiche details device by id (one device)
    getDeviceById() {
      this.deviceservice.getDeviceById(this.id).subscribe((data) => {
        console.log("dataaaa",data)
        this.updateDeviceFormGroup.patchValue({
          deviceReference: data.reference,
          deviceBrand: data.brand,
          note: data.note,
          classId:data.classId
        });
        console.log("new form for update:", this.updateDeviceFormGroup);
        this.classeservice.getAllClasses().subscribe((classes: Class[]) => {
          this.classDevices = classes;
        });
      });
    }  

//update device  details 
updateDevice():void{
  this.submitted=true;
  if(this.updateDeviceFormGroup.valid){
    console.log("updatedevice",this.updateDeviceFormGroup)
    this.updateDeviceForm.reference=this.updateDeviceFormGroup.get('deviceReference')!.value;
    this.updateDeviceForm.brand=this.updateDeviceFormGroup.get('deviceBrand')!.value;
    this.updateDeviceForm.classId = this.updateDeviceFormGroup.get('classId')?.value;
    this.updateDeviceForm.note=this.updateDeviceFormGroup.get('note')!.value;
    this.deviceservice.updateDevice(this.id, this.updateDeviceForm).subscribe({
      next: (data) => {
        console.log('datttta', data);
        if (data){
          Swal.fire({
            text: 'لقد تم تعديل الجهاز بنجاح .',
            icon: 'success',
            confirmButtonColor: '#2ECC71',
            confirmButtonText: 'حسنًا',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            }
          })  
        }},
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
    })
  }
}

//control form function
get formControl():{[key:string]:AbstractControl}{
  return this.updateDeviceFormGroup.controls
}

//close modal function
closeModal(){
  this.modalservice.dismissAll();
}

//reset form function
  onReset(event:Event){
    event.preventDefault()
    this.submitted=false;
    this.updateDeviceFormGroup.reset()
  }
  ngOnInit(): void {

    this.getDeviceById()
  }

  onClassSelect(event: any): void {
    const selectedClassId = event.target.value;
    const selectedClass = this.updateDeviceForm.find((classDevice: Class) => classDevice._id === selectedClassId);
    
    if (selectedClass) {
      this.updateDeviceFormGroup.get('classId')?.setValue(selectedClass._id);
    }
  }

}
