import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Class } from 'src/app/Models/class';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-classe',
  templateUrl: './update-classe.component.html',
  styleUrls: ['./update-classe.component.scss'],
})
export class UpdateClasseComponent {
  id = '';
  submitted = false;
  upClasse: Class | any;
  classDetails: Class | undefined;
  upClasseForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private translateservice: TranslateService,
    private classSer: ClasseServiceService,
    private activated: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activated.queryParams.subscribe((data) => {
      this.id = data['id'];
      console.log(this.id);
    });
    this.translateservice.setDefaultLang('ar');
    this.upClasse = {
      name: '',
      type: '',
      building: '',
      note: '',
      capacityOfStudent: 0,
      department :''
    };
  }
  closeModal() {
    this.activeModal.dismiss();
  }
  getClassDetails() {
    this.classSer.getDetailsClass(this.id).subscribe((data) => {
      this.upClasseForm = this.fb.group({
        classeName: [data.name, Validators.required],
        buildingName: [data.building, Validators.required],
        nbrStudent: [data.capacityOfStudent, Validators.required],
        type: [data.type, Validators.required],
        note: [data.note],
        department:[data.department, Validators.required]
      });
      console.log('ff', data);
    }); }

  updateClasse() {
    this.submitted = true;
    if (this.upClasseForm.valid) {
      this.upClasse.name = this.upClasseForm.get('classeName')!.value;
      this.upClasse.type = this.upClasseForm.get('type')!.value;
      this.upClasse.building = this.upClasseForm.get('buildingName')!.value;
      this.upClasse.note = this.upClasseForm.get('note')!.value;
      this.upClasse.capacityOfStudent =
        this.upClasseForm.get('nbrStudent')!.value;
        this.upClasse.department =
        this.upClasseForm.get('department')!.value;
      this.classSer.updateClasse(this.upClasse, this.id).subscribe({
        next: (data) => {
          console.log('hi', data);
          if (data){
            Swal.fire({
              text: 'لقد تم تعديل القاعة بنجاح .',
              icon: 'success',
              confirmButtonColor: '#2ECC71',
              confirmButtonText: 'حسنًا',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()
              }})}},
        error: (err) => {
          if (err.status == 500) {
            Swal.fire({
              text: 'تأكد من صحة البيانات !!',
              icon: 'error',
              confirmButtonText: 'حسنًا',
              confirmButtonColor: '#E74C3C',
            });
          }
        }, }
);
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.upClasseForm.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.upClasseForm.reset();
  }
  ngOnInit(): void {
    this.getClassDetails();
  }
}
