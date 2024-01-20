import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private router:Router,private translteservice:TranslateService){
    this.translteservice.setDefaultLang('ar');

  }
redirectToLogin() {
  this.router.navigateByUrl('/login')
}

  imagePath:string='../../assets/img/notFound.webp'
}
