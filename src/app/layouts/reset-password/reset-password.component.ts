import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  token: String | undefined;
  private helper = new JwtHelperService();
  resetPassForm: FormGroup = new FormGroup({
    password: new FormControl(''),
  });
  submitted = false;
  resetpassword: any;
  userEmail: any;
  decodedToken: any;
  constructor(
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authSer: AuthServiceService,
    private translateservice: TranslateService,private router:Router
  ) {
    this.translateservice.setDefaultLang('ar');
    // this.activated.queryParams.subscribe((data) => {
    //   this.token = data['token'];
    //   console.log(this.token);

    // });
    this.resetpassword = {
      password: '',
      email: '',
    };
  }
  decodeJWT(token: any) {
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      console.log('lll', decodedToken);
      return decodedToken;
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.resetPassForm.controls;
  }
  resetPassword(): void {
    this.submitted = true;
    if (this.resetPassForm.invalid) {
      return;
    }
    this.resetpassword.password = this.resetPassForm.get('password')!.value;
    this.resetpassword.email = this.userEmail;
    this.authSer.resetMypassword(this.resetpassword).subscribe({
      next: (data) => {
        console.log('hi', data);
        if (data)
          Swal.fire({
            title: '  تغيير كلمة السرّ  !',
            text: 'لقد تمّ تغيير كلمة السّر بنجاح .',
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
            text: 'البريد الإلكتروني موجود من قبل !!!',
            icon: 'error',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#E74C3C',
          });
        }
      },
    });
  }
  onReset(): void {
    this.submitted = false;
    this.resetPassForm.reset();
  }
  ngOnInit(): void {
    this.activated.queryParams.subscribe((data) => {
      this.token = data['token'];
      console.log(this.token);
    });
    if(this.token){
    this.resetPassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.decodedToken = this.decodeJWT(this.token);
    this.userEmail = this.decodedToken.email;
  }else{
    if( localStorage.getItem('isLoggedIn')){
    this.router.navigateByUrl("/classes")}else{
 } this.router.navigateByUrl("/login")}

  }
 
}
