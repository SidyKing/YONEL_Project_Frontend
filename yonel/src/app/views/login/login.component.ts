import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  returnUrl!: string ;
  message = '';
  profil:any;

  constructor(
    private authService: AuthService,
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

    ngOnInit(): void {

      this.loginForm = this.formBulder.group({
        login: ['', [Validators.required]],
        password: ['', Validators.required]
      })
      console.log(this.loginForm.value.login)
    }
    get f() { return this.loginForm.controls; }

    get value() {
      return this.loginForm.controls;
    }
    onSubmit() {
      this.submitted = true;
      this.message='';
      if (this.loginForm.invalid) {
        return;
      } else {
        this.authService.authenticate(this.loginForm.value.login, this.loginForm.value.password).subscribe(
          result => {
              this.alert();
              const tokenInfo = this.authService.getDecodedAccessToken(result.token);
              if(tokenInfo){
                  this.profil= tokenInfo.key;
                if(this.profil=='ADMIN'){
                  this.router.navigate(['/Home']);
                }else if(this.profil=='USER'){
                this.router.navigate(['/Accueil']);
                }
              }

          },
          error => {
            this.alertBad();
            console.log(error);
          }
        );

      }
    }


    alert(){
      Swal.fire({
        icon: 'success',
        title: 'Login réussi !',
        showConfirmButton: false,
        timer: 1200
      })
    }
    alertBad(){
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Echec de la connexion ! login ou mot de passe incorrect .',
      })
    }
}
