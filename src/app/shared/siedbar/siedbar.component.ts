import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'app-siedbar',
  templateUrl: './siedbar.component.html',
  styleUrls: ['./siedbar.component.scss']
})
export class SiedbarComponent implements OnInit {
 role=localStorage.getItem('role')
 status = localStorage.getItem('status')
 
  constructor(private translateservice:TranslateService ) {
    this.translateservice.setDefaultLang('ar');
  }
  
  ngOnInit(): void {

  }

}
