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
              console.log(result)
              this.alert();
              this.router.navigate(['/Accueil']);
          },
          error => {
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
}
