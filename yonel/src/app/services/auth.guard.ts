import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot) {

    let profil = sessionStorage.getItem('key');
    var expectedProfil = profil;
    if(route.data['expectedProfil']){
      expectedProfil=route.data['expectedProfil'];
    }

    if (this.authService.isUserLoggedIn() && (profil==expectedProfil) )
      return true;

    this.router.navigate(['login']);
    return false;

}

}
