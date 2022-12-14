import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
  userId=sessionStorage.getItem('userId') as string;
  prenom:any;

  constructor(private authService:AuthService,private router:Router){ }

  ngOnInit(): void {
    this.authService.getUserById(this.userId).subscribe((data:any)=>{
      this.prenom=data.login;
    });
  }
  deconnexion() {
    this.authService.logOut();
    this.alert();
    this.router.navigate(['acceuil']);
  }
  alert(){
    Swal.fire({
      icon: 'success',
      title: 'Bye Bye !',
      showConfirmButton: false,
      timer: 1000
    })
  }
}
