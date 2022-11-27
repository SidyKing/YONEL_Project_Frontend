import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
})
export class ProfilComponent implements OnInit{
  userId= sessionStorage.getItem("userId") as string;
  profil:any;

  constructor(
    private authService: AuthService,
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

    this.authService.getUserById(this.userId).subscribe(data => {
      this.profil=data;
      console.log(data);
    });
  }

}
