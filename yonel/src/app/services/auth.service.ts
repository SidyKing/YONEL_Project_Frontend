import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl='http://localhost:5000'

  constructor(private httpClient: HttpClient) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  authenticate(login: string, password: string) {
    return this.httpClient
      .post<any>(this.apiUrl+'/user/login', { login, password })
      .pipe(
        map((userData) => {
          const token = userData.token as string;
          const tokenInfo = this.getDecodedAccessToken(token); // decode token

          sessionStorage.setItem('token', token);
          sessionStorage.setItem('login', tokenInfo.login);
          sessionStorage.setItem('key', tokenInfo.key);
          sessionStorage.setItem('userId', tokenInfo.id)
          return userData;
        })
      );
  }

  transaction(
    montant:number,
    date:string,
    frais:number,
    statut:string,
    userId:string,
    emetteurId:string,
    recepteurId:string,
    deviseOrigineCodeIso3:string,
    deviseDestinationCodeIso3:string,
  ){
    return this.httpClient
      .post<any>(this.apiUrl+'/transaction', {
        "date":date,
        "statut":statut,
        "userId":userId,
        "emetteurId":emetteurId,
        "recepteurId":recepteurId,
        "deviseOrigineCodeIso3":deviseOrigineCodeIso3,
        "deviseDestinationCodeIso3":deviseDestinationCodeIso3,
        "montant":montant,
        "frais":frais,
       })
       .pipe(
        map((userData) => {
          return userData;
        })
        );

  }
  paiement(
    date:string,
    numero_piece:string,
    type_piece:string,
    nom_recepteur:string,
    transactionId:string
  ){
    return this.httpClient
    .post<any>(this.apiUrl+'/paiement', {
      "date":date,
      "numero_piece":numero_piece,
      "type_piece":type_piece,
      "nom_recepteur":nom_recepteur,
      "transactionId":transactionId,
    })
    .pipe(
      map((userData) => {
        return userData;
      }));
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('token');
    return !(user === null);
  }
  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('userId');
  }

  getPays(){
    return this.httpClient.get<any>(this.apiUrl+'/pays/');
  }
  getDevises(){
    return this.httpClient.get<any>(this.apiUrl+'/devise/');
  }
  verifEmetteur(
    tel:string){

    return this.httpClient
    .post<any>(this.apiUrl+'/client/verifClient', {
      tel,
    })
    .pipe(
      map((userData) => {
        return userData;
      }));
  }

  verifRecepteur(
    tel:string){
      return this.httpClient
    .post<any>(this.apiUrl+'/client/verifClient', {
      tel,
    })
    .pipe(
      map((userData) => {
        return userData;
      }));
    }
    getUserById(id:string){
      return this.httpClient.get<any>(this.apiUrl+'/user/'+id);
    }
    getTransactionById(id:string){
      return this.httpClient.get<any>(this.apiUrl+'/transaction/'+id);
    }
    changerMotDePasse(id:string, password:string){
      return this.httpClient
      .put<any>(this.apiUrl+'/user/'+id, {
        password,
      })
      .pipe(
        map((userData) => {
          return userData;
        }));
    }
    getPaiement(){
      return this.httpClient.get<any>(this.apiUrl+'/paiement/');
    }
    getTransaction(){
      return this.httpClient.get<any>(this.apiUrl+'/transaction/');
    }


}
