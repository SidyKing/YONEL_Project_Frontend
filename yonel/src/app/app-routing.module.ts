import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AccueilComponent } from './views/accueil/accueil.component';
import { CreerAgenceComponent } from './views/admin/creer-agence/creer-agence.component';
import { CreerSousAgenceComponent } from './views/admin/creer-sous-agence/creer-sous-agence.component';
import { CreerUserComponent } from './views/admin/creer-user/creer-user.component';
import { HomeComponent } from './views/admin/home/home.component';
import { CreationClientComponent } from './views/creation-client/creation-client.component';
import { ErrorComponent } from './views/error/error.component';
import { ListTransactionComponent } from './views/list-transaction/list-transaction.component';
import { LoginComponent } from './views/login/login.component';
import { PaiementComponent } from './views/paiement/paiement.component';
import { ProfilComponent } from './views/profil/profil.component';
import { TransactionComponent } from './views/transaction/transaction.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Error',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'Accueil',
    component: AccueilComponent,
    data: {
      title: 'Accueil',
      expectedProfil: 'USER'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'Transaction',
    component: TransactionComponent,
    data: {
      title: 'Transaction',
      expectedProfil: 'USER'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'Paiement',
    component: PaiementComponent,
    data: {
      title: 'Paiement',
      expectedProfil: 'USER'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'ListeTransaction',
    component: ListTransactionComponent,
    data: {
      title: 'ListeTransaction',
      expectedProfil: 'USER'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'CreationClient',
    component: CreationClientComponent,
    data: {
      title: 'CreationClient',
      expectedProfil: 'USER'
    },
    canActivate: [AuthGuard]
  },
  {
    path:'Error',
    component: ErrorComponent,
    data:{
      title:'Error',
    }
  },
  {
    path:'Profil',
    component: ProfilComponent,
    data:{
      title:'Profil',
      expectedProfil: 'USER'
    },
    canActivate: [AuthGuard]
  },
  {
    path:'Home',
    component: HomeComponent,
    data:{
      title:'Home Admin',
      expectedProfil: 'ADMIN'
    },
    canActivate: [AuthGuard]
  },
  {
    path:'Creer-agence',
    component: CreerAgenceComponent,
    data:{
      title:'Creer Agence',
      expectedProfil: 'ADMIN'
    },
    canActivate: [AuthGuard]
  },
  {
    path:'Creer-sous-agence',
    component: CreerSousAgenceComponent,
    data:{
      title:'Creer sous agence',
      expectedProfil: 'ADMIN'
    },
    canActivate: [AuthGuard]
  },
  {
    path:'Creer-user',
    component: CreerUserComponent,
    data:{
      title:'Creer user',
      expectedProfil: 'ADMIN'
    },
    canActivate: [AuthGuard]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
