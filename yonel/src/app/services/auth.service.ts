import { TransactionComponent } from './../views/transaction/transaction.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl='http://localhost:5000/'

  constructor(private httpClient: HttpClient) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  authenticate(email: string, password: string) {
    return this.httpClient
      .post<any>(this.apiUrl+'login', { email, password })
      .pipe(
        map((userData) => {
          const token = userData.token as string;
          const tokenInfo = this.getDecodedAccessToken(token); // decode token

          sessionStorage.setItem('token', token);
          sessionStorage.setItem('email', tokenInfo.email);
          return userData;
        })
      );
  }

  transaction(
    client1:string,
    client2:string,
    pays_origine:string,
    pays_destination:string,
    device_origine:string,
    device_destination:string,
    montant:number,
    frais:number
  ){
    return this.httpClient
      .post<any>(this.apiUrl+'transaction', {
        client1,
        client2,
        pays_origine,
        pays_destination,
        device_origine,
        device_destination,
        montant,
        frais
       })
       .pipe(
        map((userData) => {
          return userData;
        })
        );

  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('token');
    return !(user === null);
  }
  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
  }


}
