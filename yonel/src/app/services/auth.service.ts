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
    montant:String,
    date:String,
    frais:String,
    statut:String,
    userId:String,
    emetteurId:String,
    recepteurId:String,
    deviseOrigineCodeIso3:String,
    deviseDestinationCodeIso3:String,
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
  CreerClient(
    nom:String,
    prenom:String,
    telephone:String,
    email:String,
    date_naissance:Date,
    lieu_naissance:String,
  ){
    return this.httpClient
      .post<any>(this.apiUrl+'/client', {
        "nom":nom,
        "prenom":prenom,
        "telephone":telephone,
        "email":email,
        "date_naissance":date_naissance,
        "lieu_naissance":lieu_naissance,
       })
       .pipe(
        map((userData) => {
          return userData;
        })
        );

  }
  CreerUser(
    login:String,
    password:String,
    sousAgence:any,
    key:String
  ){
    return this.httpClient
      .post<any>(this.apiUrl+'/user/register', {
        "login":login,
        "password":password,
        "sousAgenceCode":sousAgence,
        "key":key,
       })
       .pipe(
        map((userData) => {
          return userData;
        })
        );

  }
  CreerSousAgence(
    code:String,
    nom:String,
    adresse:String,
    telephone:String,
    email:String,
    agence:String,
    ville:String,
  ){
    return this.httpClient
      .post<any>(this.apiUrl+'/sousAgence', {
        "code":code,
        "nom":nom,
        "adresse":adresse,
        "telephone":telephone,
        "email":email,
        "agenceCode":agence,
        "villeCodeIso2":ville,
       })
       .pipe(
        map((userData) => {
          return userData;
        })
        );

  }
  CreerAgence(
    code:String,
    nom:String,
    statut:String,
  ){
    return this.httpClient
      .post<any>(this.apiUrl+'/agence', {
        "code":code,
        "nom":nom,
        "statut":statut,
       })
       .pipe(
        map((userData) => {
          return userData;
        })
        );

  }
  paidStatut(id:string){
    return this.httpClient
      .put<any>(this.apiUrl+'/transaction/'+id, {
        statut:"Paid",
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }

  CancelledStatut(id:string){
    return this.httpClient
      .put<any>(this.apiUrl+'/transaction/'+id, {
        statut:"Cancelled",
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  UpdateTransaction(
    id:string,
    montant:String,
    date:String,
    frais:String,
    statut:String,
    userId:String,
    emetteurId:String,
    recepteurId:String,
    deviseOrigineCodeIso3:String,
    deviseDestinationCodeIso3:String,
  ){
    return this.httpClient
      .put<any>(this.apiUrl+'/transaction/'+id, {
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
  getTransactionByUserID(
    userId:string){
      return this.httpClient
    .post<any>(this.apiUrl+'/transaction/userID', {
      userId,
    })
    .pipe(
      map((userData) => {
        return userData;
      }));
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
    verifAgenceSurBalance(
      agenceCode:string){
        return this.httpClient
      .post<any>(this.apiUrl+'/balance/verifAgenceCode', {
        agenceCode,
      })
      .pipe(
        map((userData) => {
          return userData;
        }));
    }
    UpdateBalnce(
      id:string,
      montant:String,
    ){
      return this.httpClient
        .put<any>(this.apiUrl+'/balance/'+id, {
          "montant":montant,
         })
         .pipe(
          map((userData) => {
            return userData;
          })
          );

    }
    getUserById(id:string){
      return this.httpClient.get<any>(this.apiUrl+'/user/'+id);
    }
    getBalanceByid(id:string){
      return this.httpClient.get<any>(this.apiUrl+'/balance/'+id);
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
    getUsers(){
      return this.httpClient.get<any>(this.apiUrl+'/user/');
    }
    getSousAgences(){
      return this.httpClient.get<any>(this.apiUrl+'/sousAgence/');
    }
    getVilles(){
      return this.httpClient.get<any>(this.apiUrl+'/ville/');
    }
    getAgences(){
      return this.httpClient.get<any>(this.apiUrl+'/agence/');
    }
    supprimerUser(id:string){
      return this.httpClient.delete<any>(this.apiUrl+'/user/'+id);
    }



}
