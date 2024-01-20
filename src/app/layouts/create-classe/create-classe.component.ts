import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Class } from 'src/app/Models/class';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-classe',
  templateUrl: './create-classe.component.html',
  styleUrls: ['./create-classe.component.scss'],
})
export class CreateClasseComponent {
  submitted = false;
  modalRef: any;
  creaClasse: Class | any;
  createClasseForm: FormGroup = new FormGroup({
    classeName: new FormControl('', Validators.required),
    buildingName: new FormControl('', Validators.required),
    nbrStudent: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    note: new FormControl(''),
  });
  constructor(
    public activeModal: NgbActiveModal,
    private translateservice: TranslateService,
    private classSer: ClasseServiceService
  ) {
    this.translateservice.setDefaultLang('ar');
    this.creaClasse = {
      name: '',
      type: '',
      building: '',
      note: '',
      capacityOfStudent: 0,
      department: '',
    };
  }
  closeModal() {
    this.activeModal.dismiss();
  }
  createClasse() {
    this.submitted = true;
    if (this.createClasseForm.valid) {
      console.log("object",this.createClasseForm.valid)
      this.creaClasse.name = this.createClasseForm.get('classeName')!.value;
      this.creaClasse.type = this.createClasseForm.get('type')!.value;
      this.creaClasse.building =
        this.createClasseForm.get('buildingName')!.value;
      this.creaClasse.note = this.createClasseForm.get('note')!.value;
      this.creaClasse.department =
        this.createClasseForm.get('department')!.value;
      this.creaClasse.capacityOfStudent =
        this.createClasseForm.get('nbrStudent')!.value;
      this.classSer.addClass(this.creaClasse).subscribe({
        next: (data) => {
          console.log('hi', data);
          if (data)
            Swal.fire({
              text: 'لقد تم إضافة القاعة بنجاح .',
              icon: 'success',
              confirmButtonColor: '#2ECC71',
              confirmButtonText: 'حسنًا',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
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
        },
      });
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.createClasseForm.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.createClasseForm.reset();
  }

  ngOnInit(): void {}
}
