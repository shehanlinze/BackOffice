import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateClasseComponent } from '../create-classe/create-classe.component';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import { Subject } from 'rxjs/internal/Subject';
import { Class } from 'src/app/Models/class';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit, AfterViewInit {
  classes: Class[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger!: Subject<ADTSettings>;
  data: any[] = [];
  isLoggedIn = localStorage.getItem('isLoggedIn');
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private classeservice: ClasseServiceService,
    private renderer: Renderer2,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('ar');
  }

  deletClass(id: any): void {
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
        this.classeservice.delClasse(id).subscribe({
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
        window.location.reload();
      }
    });
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
          searchPlaceholder: 'أدخل إسم القاعة أو المبنى',
        },
        //get all classes with API
        ajax: (dataTablesParameters: any, callback: any) => {
          this.classeservice.getAllClasses().subscribe((data: Class[]) => {
            callback({
              recordsTotal: data.length,
              recordsFiltered: data.length,
              data: data,
            });
          });
        },
        //column and content of culumn datatable
        columns: [
          { title: 'إسم القاعة ', data: 'name' },
          { title: 'اسم المبنى', data: 'building' },
          {
            data: '_id',
            title: 'إجراءات',
            render: function (data: any, type: any, full: any) {
              return (
                '<a href="/classDetails?id=' +
                data +
                '"><i style="font-size: 15px; margin-left:10px;" class="fa fa-info-circle"></i></a><a class="delete" data-id="' +
                data +
                '"><i class="fa fa-times-circle" aria-hidden="true" style="font-size: 15px;  color:#E11D48 "></i></a>'
              );
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
          '/class/' + event.target.getAttribute('view-class-id'),
        ]);
      }
    });
    $('#tableT').on('click', '.delete', (event: any) => {
      const id = $(event.currentTarget).data('id');
      console.log('eeeeeeeee', id);
      this.deletClass(id);
    });
  }
  viewClass(id: number): void {
    this.router.navigate(['/class/' + id]);
  }
  //function show classe component
  addClasse() {
    const modalOptions: NgbModalOptions = {
      size: 'lg',
      windowClass: 'custom-modal-background',
    };
    this.modalService.open(CreateClasseComponent, modalOptions);
  }
}
