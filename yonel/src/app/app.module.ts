import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { AccueilComponent } from './views/accueil/accueil.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';
import { NavComponent } from './views/nav/nav.component';
import { TransactionComponent } from './views/transaction/transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasicAuthInterceptorService } from './services/_helpers/basic-auth-interceptor.service';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ListTransactionComponent } from './views/list-transaction/list-transaction.component';
import { CreationClientComponent } from './views/creation-client/creation-client.component';
import { ErrorComponent } from './views/error/error.component';
import { ProfilComponent } from './views/profil/profil.component';
import { PaiementComponent } from './views/paiement/paiement.component';
import { HomeComponent } from './views/admin/home/home.component';
import { CreerAgenceComponent } from './views/admin/creer-agence/creer-agence.component';
import { CreerSousAgenceComponent } from './views/admin/creer-sous-agence/creer-sous-agence.component';
import { CreerUserComponent } from './views/admin/creer-user/creer-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    TransactionComponent,
    ListTransactionComponent,
    CreationClientComponent,
    ErrorComponent,
    ProfilComponent,
    PaiementComponent,
    HomeComponent,
    CreerAgenceComponent,
    CreerSousAgenceComponent,
    CreerUserComponent,
   ],
  imports: [
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({ /* options */ }),

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass : BasicAuthInterceptorService , multi:true},
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
