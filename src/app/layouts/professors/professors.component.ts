import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Staff } from 'src/app/Models/staff';
import { StaffServiceService } from 'src/app/services/staff-service.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss'],
})
export class ProfessorsComponent implements OnInit, AfterViewInit {
  classes: Staff[] = [];
  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  dtTrigger!: Subject<ADTSettings>;
  constructor(
    private staffService: StaffServiceService,
    private router: Router,
    private translateservice: TranslateService,
    private renderer: Renderer2
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
          searchPlaceholder: '  إسم الفني او بريده الإلكتروني ',
        },
        //get all StaffNotApprouved with API
        ajax: (dataTablesParameters: any, callback: any) => {
          this.staffService
            .getStaffNotApprouved()
            .subscribe((data: Staff[]) => {
              callback({
                recordsTotal: data.length,
                recordsFiltered: data.length,
                data: data,
              });
            });
        },
        //column and content of culumn datatable
        columns: [
          { title: 'إسم الفني ', data: 'fullName' },
          { title: ' البريد الالكتروني', data: 'email' },
          {
            data: '_id',
            title: 'تفعيل',
            render: function (data: any, type: any, full: any) {
              return (
                '<a class="enableStaff" data-id="' +
                data +
                '"><i class="fa fa-check-circle" aria-hidden="true" style="font-size: 15px; color:green"></i></a>'
              );
            },
            createdCell: (
              cell: Node,
              cellData: any,
              rowData: any,
              rowIndex: number,
              colIndex: number
            ) => {
              this.renderer.listen(cell, 'click', () => {
                this.enableStaff(cellData);
              });
            },
          },
          {
            data: '_id',
            title: 'حذف',
            render: function (data: any, type: any, full: any) {
              return (
                '<a class="deleteStaff" data-id="' +
                data +
                '"><i class="fa fa-times-circle" aria-hidden="true" style="font-size: 15px;  color:#E11D48 "></i></a>'
              );
            },
            createdCell: (
              cell: Node,
              cellData: any,
              rowData: any,
              rowIndex: number,
              colIndex: number
            ) => {
              this.renderer.listen(cell, 'click', () => {
                this.deleteStaff(cellData);
              });
            },
          },
        ],
      };
      this.dtOptions1 = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthMenu: [5, 10, 25],
        processing: true,
        //update langage datatable
        language: {
          url: './assets/i18n/arabic.json',
          searchPlaceholder: '  إسم الفني او بريده الإلكتروني ',
        },
        ajax: (dataTablesParameters: any, callback: any) => {
          this.staffService.getStaffApprouved().subscribe((data1: Staff[]) => {
            callback({
              recordsTotal: data1.length,
              recordsFiltered: data1.length,
              data: data1,
            });
          });
        },
        columns: [
          { title: 'إسم الفني ', data: 'fullName' },
          { title: ' البريد الالكتروني', data: 'email' },
          {
            data: '_id',
            title: 'تعطيل',
            render: function (data: any, type: any, full: any) {
              return (
                '<a class="disableStaff" data-id="' +
                data +
                '"><i class="fa fa-check-circle" aria-hidden="true" style="font-size: 15px; color:#E11D48"></i></a>'
              );
            },
            createdCell: (
              cell: Node,
              cellData: any,
              rowData: any,
              rowIndex: number,
              colIndex: number
            ) => {
              this.renderer.listen(cell, 'click', () => {
                this.disableStaff(cellData);
              });
            },
          },
        ],
      };
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('view-class-id')) {
        this.router.navigate([
          '/staff/' + event.target.getAttribute('view-class-id'),
        ]);
      }
    });
  }
  enableStaff(id: String) {
    this.staffService.enableStaff(id).subscribe({
      next: (data) => {
        if (data) {
          Swal.fire({
            text: 'لقد تم  التفعيل بنجاح .',
            icon: 'success',
            confirmButtonColor: '#2ECC71',
            confirmButtonText: 'حسنًا',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      },
      error: (err) => {
        if (err.status == 500) {
          Swal.fire({
            text: '  هناك خطأ!!',
            icon: 'error',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#E74C3C',
          });
        }
      },
    });
  }
  disableStaff(id: String) {
    this.staffService.disableStaff(id).subscribe({
      next: (data) => {
        console.log('hi', data);
        if (data) {
          Swal.fire({
            text: 'لقد تم  التعطيل بنجاح .',
            icon: 'success',
            confirmButtonColor: '#2ECC71',
            confirmButtonText: 'حسنًا',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      },
      error: (err) => {
        if (err.status == 500) {
          Swal.fire({
            text: ' هناك خطأ !!',
            icon: 'error',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#E74C3C',
          });
        }
      },
    });
  }
  deleteStaff(id: String) {
    this.staffService.deleteSrtaff(id).subscribe({
      next: (data) => {
        console.log('hi', data);
        if (data) {
          Swal.fire({
            text: 'لقد تم الحذف بنجاح .',

            icon: 'success',
            confirmButtonColor: '#2ECC71',
            confirmButtonText: 'حسنًا',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      },
      error: (err) => {
        if (err.status == 500) {
          Swal.fire({
            text: ' هناك خطأ !',
            icon: 'error',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#E74C3C',
          });
        }
      },
    });
  }
  showProfApprovedTable = true;
  toggleProfApproved() {
    this.showProfApprovedTable = true;
  }
  toggleProfInapproved() {
    this.showProfApprovedTable = false;
  }
}
