import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: any = false;
  signInForm: any = {
    email: null,
    password: null,
  };
  submitted = false;
  constructor(
    private router: Router,
    private translateservice: TranslateService,
    private authService: AuthServiceService
  ) {
    this.translateservice.setDefaultLang('ar');
  }
  clearObjectContent(obj: any): void {
    Object.keys(obj).forEach((key) => (obj[key] = undefined));
  }
  onReset(): void {
    this.submitted = false;
    this.clearObjectContent(this.signInForm);
  }
  signIn(): void {
    this.submitted = true;
    console.log('user', this.signInForm);
    if (this.signInForm) {
      this.authService.signIn(this.signInForm).subscribe({
        next: (data) => {
          console.log('data', data);
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', this.isLoggedIn);
          localStorage.setItem('token', data.body.token);
          this.router.navigateByUrl('/classes');
          window.location.reload();
        },
        error: (err) => {
          if (err.status == 404) {
            Swal.fire({
              title: 'خطأ',
              text: 'لم يتم العثور على مستخدم!!!',
              icon: 'error',
              confirmButtonText: 'حسنًا',
              confirmButtonColor: '#FF0000',
            });
          } else {
            if (err.status == 401) {
              Swal.fire({
                title: 'خطأ',
                text: 'البريد الإلكتروني أو كلمة المرور غير صحيحة!!!',
                icon: 'error',
                confirmButtonText: 'حسنًا',
                confirmButtonColor: '#FF0000',
              });
            }
          }
        },
      });
    }
  }
 

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn'))
      this.router.navigateByUrl('/classes');
  }
}
