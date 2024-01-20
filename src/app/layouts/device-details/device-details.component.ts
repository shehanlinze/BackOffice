import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Devices } from 'src/app/Models/devices';
import { DeviceServiceService } from 'src/app/services/device-service.service';
import Swal from 'sweetalert2';
import { DeviceUpdateComponent } from '../device-update/device-update.component';
import { ClasseServiceService } from 'src/app/services/classe-service.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnInit {
  deviceDetails: Devices | any;
  nameOfClasse: any;
  id = '';
  idClasse = '';
  constructor(
    private translateservice: TranslateService,
    private deviceservice: DeviceServiceService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private modalservice: NgbModal,
    private classeService: ClasseServiceService
  ) {
    this.translateservice.setDefaultLang('ar');
    this.activatedroute.queryParams.subscribe((Data) => {
      this.id = Data['id'];
    });
  }
  //affiche details one device by id
  getDetailsOneDevice(id: string) {
    this.deviceservice.getDeviceById(id).subscribe((Data) => {
      this.deviceDetails = Data;
      this.idClasse = Data.classId;
      console.log("object",Data)
      this.getClassById(Data.classId);
    });
  }
  getClassById(ids: string) {
    this.classeService.getDetailsClass(ids).subscribe((data) => {
      this.nameOfClasse = data.name;
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') != 'true')
      this.router.navigateByUrl('/login');
    this.getDetailsOneDevice(this.id);
  }

  //delete device
  deleteDevice(id: string): void {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'سوف يتم حذف الجهاز بشكل نهائي!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالحذف!',
      cancelButtonText: 'لا، إلغاء الأمر',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deviceservice.deleteDeviceById(id).subscribe({
          next: (data) => {
            if (data) {
              console.log('data', data);
              Swal.fire({
                text: 'لقد تم حذف الجهاز بنجاح .',
                icon: 'success',
                confirmButtonColor: '#2ECC71',
                confirmButtonText: 'حسنًا',
              });
            }
          },
        });
        this.router.navigateByUrl('/devices');
      }
    });
  }












  //function open modal for update device
  updateDevice(): void {
    const modalOptions: NgbModalOptions = {
      size: 'lg',
      windowClass: 'custom-modal-background',
    };
    this.modalservice.open(DeviceUpdateComponent, modalOptions);
  }
}
