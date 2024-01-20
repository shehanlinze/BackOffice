import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPassForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  submitted = false;
  forgotPassword: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authSer: AuthServiceService,
    private translateservice: TranslateService
  ) {
    this.translateservice.setDefaultLang('ar');

    this.forgotPassword = {
      email: '',
    };
  }
  get f(): { [key: string]: AbstractControl } {
    return this.forgotPassForm.controls;
  }
  forgotPasse(): void {
    this.submitted = true;
    if (this.forgotPassForm.invalid) {
      return;
    }
    this.forgotPassword.email = this.forgotPassForm.get('email')!.value;
    this.authSer.forgotMypassword(this.forgotPassword).subscribe({
      next: (data) => {
        console.log('ici', data);
        if (data)
          Swal.fire({
            title: '  تفقد بريدك الالكتروني  !',
            text: 'لقد تم إرسال رابط  الى بريدك الإلكتروني لتغير كلمة السرّ الخاصة بك.',
            icon: 'success',
            confirmButtonColor: '#2ECC71',
            confirmButtonText: 'حسنًا',
          });
      },
      error: (err) => {
        console.log('pfff', err);
        if (err.status == 400) {
          Swal.fire({
            title: 'خطأ',
            text: 'البريد الإلكتروني غير موجود!!!',
            icon: 'error',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#E74C3C',
          });
        }
        if (err.status == 500) {
          Swal.fire({
            title: 'خطأ',
            text: 'خطأ أثناء إرسال الرسالة إلى بريدك الإلكتروني !!!',
            icon: 'error',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#E74C3C',
          });
        }
      
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.forgotPassForm.reset();
  }
  ngOnInit(): void {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    if (localStorage.getItem('isLoggedIn'))
      this.router.navigateByUrl('/classes');
  }
}
