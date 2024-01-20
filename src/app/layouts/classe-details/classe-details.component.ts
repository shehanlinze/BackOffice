import { ClasseServiceService } from './../../services/classe-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Class } from 'src/app/Models/class';
import { Devices } from 'src/app/Models/devices';
import Swal from 'sweetalert2';
import { UpdateClasseComponent } from '../update-classe/update-classe.component';
@Component({
  selector: 'app-classe-details',
  templateUrl: './classe-details.component.html',
  styleUrls: ['./classe-details.component.scss'],
})
export class ClasseDetailsComponent {
  id = '';
  classDetails: Class | undefined;
  classDevices: Devices[] = [];
  lenclassDevices: number;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private activated: ActivatedRoute,
    private classSer: ClasseServiceService,
    private translateservice: TranslateService
  ) {
    this.lenclassDevices = 0;
    this.translateservice.setDefaultLang('ar');
    this.activated.queryParams.subscribe((data) => {
      this.id = data['id'];
      console.log(this.id);
    });
  }
  getClassDetails(id: string) {
    this.classSer.getDetailsClass(id).subscribe((data) => {
      this.classDetails = data;
      console.log('ff', data);
    });
  }
  delClass(id: string) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'سوف يتم حذف القاعة بشكل نهائي!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالحذف!',
      cancelButtonText: 'لا، إلغاء الأمر',
    }).then((result) => {
      if (result.isConfirmed) {
        this.classSer.delClasse(id).subscribe({
          next: (data) => {
            if (data)
              Swal.fire({
                text: 'لقد تم حذف القاعة بنجاح .',
                icon: 'success',
                confirmButtonColor: '#2ECC71',
                confirmButtonText: 'حسنًا',
              });
          },
        });
        this.router.navigateByUrl('/classes');
      }
    });
  }
  getClassDevices(id: string) {
    this.classSer.getDevices(id).subscribe((data) => {
      this.classDevices = data;
      this.lenclassDevices = data.length;
      console.log('fggf', data);
      console.log('long', this.lenclassDevices);
    });
  }
  //function add classe
  updateClasse() {
    const modalOptions: NgbModalOptions = {
      size: 'lg',
      windowClass: 'custom-modal-background',
    };
    this.modalService.open(UpdateClasseComponent, modalOptions);
  }
  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') != 'true')
      this.router.navigateByUrl('/login');
    this.getClassDetails(this.id);
    this.getClassDevices(this.id);
  }
}
