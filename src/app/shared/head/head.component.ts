import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {
  isLoggedIn = localStorage.getItem('isLoggedIn');

  constructor( private router: Router
  ) {
  }
  ngOnInit(): void {}
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }
}
