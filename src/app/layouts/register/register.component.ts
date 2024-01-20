import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Admin } from 'src/app/Models/Admin';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  adminRegister: Admin;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authSer: AuthServiceService,
    private translateservice: TranslateService
  ) {
    this.translateservice.setDefaultLang('ar');

    this.adminRegister = {
      id: 0,
      fullName: '',
      email: '',
      password: '',
    };
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }
  signUp(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.adminRegister.fullName = this.signUpForm.get('fullname')!.value;
    this.adminRegister.email = this.signUpForm.get('email')!.value;
    this.adminRegister.password = this.signUpForm.get('password')!.value;
    this.authSer.signUp(this.adminRegister).subscribe({
      next: (data) => {
        if (data == 'Admin registered successfully.') {
          Swal.fire({
            title: 'تم التسجيل بنجاح!',
            text: 'تم إنشاء حسابك بنجاح.',
            icon: 'success',
            confirmButtonColor: '#2ECC71',
            confirmButtonText: 'حسنًا',
          });
        }
      },
      error: (err) => {
        console.log('pfff', err);
        if (err.status == 400) {
          Swal.fire({
            title: 'خطأ',
            text: 'البريد الإلكتروني موجود من قبل !!!',
            icon: 'error',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#E74C3C'
          });
        }
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.signUpForm.reset();
  }
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    if (localStorage.getItem('isLoggedIn'))
    this.router.navigateByUrl('/classes');
}
  
}
