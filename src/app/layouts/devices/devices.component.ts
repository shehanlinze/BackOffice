import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Devices } from 'src/app/Models/devices';
import { DeviceServiceService } from 'src/app/services/device-service.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';
import { CreateDeviceComponent } from '../create-device/create-device.component';






@Component({
  selector: 'app-devices',


  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  devices: Devices[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger!: Subject<ADTSettings>;
  data: any[] = [];
  isLoggedIn = localStorage.getItem('isLoggedIn');

 

  constructor(
    private httpclient: HttpClient,
    private translateservice: TranslateService,
    private deviceservice: DeviceServiceService,
    private renderer: Renderer2,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.translateservice.setDefaultLang('ar');
  }
  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn')) {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthMenu: [5, 10, 25],
        processing: true,
        //update langage datatable
        language: {
          url: './assets/i18n/arabic.json',
          searchPlaceholder: 'أدخل مرجع الجهاز',
        },
        //get all classes with API
        ajax: (dataTablesParameters: any, callback: any) => {
          this.deviceservice.getAllDevices().subscribe((data: Devices[]) => {
            callback({
              recordsTotal: data.length,
              recordsFiltered: data.length,
              data: data,
            });
          });
        },
        //column and content of culumn datatable
        columns: [
          { title: 'المرجع', data: 'reference' },
          { title: ' علامة الجهاز', data: 'brand' },

          {
            data: '_id',
            title: 'إجراءات',
            render: function (data: any, type: any, full: any) {
              return (
                '<a href="/deviceDetails?id=' +
                data +
                '"><i style="font-size: 15px; margin-left:10px;" class="fa fa-info-circle"></i></a><a class="delete" data-id="' +
                data +
                '"><i class="fa fa-times-circle delete" aria-hidden="true" style="font-size: 15px;  color:#E11D48 "></i></a>'
              );
            },
          },
        ],
      };
      this.renderer.listen('document', 'click', (event) => {
        if (event.target.hasAttribute('view-device-id')) {
          this.router.navigate([
            '/devices/' + event.target.getAttribute('view-device-id'),
          ]);
        }
      });
      $('#tableT').on('click', '.delete', (event: any) => {
        const id = $(event.currentTarget).data('id');
        console.log('id device', id);
        this.deleteDevice(id);
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  deleteDevice(id: string): void {
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
        this.deviceservice.deleteDeviceById(id).subscribe({
          next: (data) => {
            if (data) console.log('data', data);
            Swal.fire({
              text: 'لقد تم حذف الجهاز بنجاح .',
              icon: 'success',
              confirmButtonColor: '#2ECC71',
              confirmButtonText: 'حسنًا',
            });
          },
        });
        window.location.reload();
      }
    });
  }

  // show create device  component (modal) function
  addNewDevice() {
    const modalOptions: NgbModalOptions = {
      size: 'lg',
      windowClass: 'custom-modal-background',
    };
    this.modalService.open(CreateDeviceComponent, modalOptions);
  }
}
