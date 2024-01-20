import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BackOffice';
  isLoggedIn =localStorage.getItem('isLoggedIn');
  constructor( ) {}

  ngOnInit(): void { 
    if(this.isLoggedIn){
      
    }
 }
}
