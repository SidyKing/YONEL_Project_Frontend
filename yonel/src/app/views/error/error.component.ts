import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {
  profil:any
  constructor() { }
  ngOnInit(): void {
    this.profil= sessionStorage.getItem('key');
  }

}
