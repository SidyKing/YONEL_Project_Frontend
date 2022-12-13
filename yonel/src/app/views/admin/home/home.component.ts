import { Component } from '@angular/core';
import * as $ from 'jquery';
import "datatables.net";
import "datatables.net-dt";
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  inputText='home';
  balance:any;
  AllUsers: any;
  totalAgence:any;
  totalSousAgence:any;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getAgences().subscribe(data => {
      this.totalAgence = data.length;
    });
    this.authService.getSousAgences().subscribe(data => {
      this.totalSousAgence = data.length;
    });
    this.balance=326400;
    this.authService.getUsers().subscribe(data => {
      this.AllUsers = data;
        setTimeout(() => {
          $('#user').DataTable({
            "language": {
              "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
            },
            pagingType: "full_numbers",
            lengthMenu:[5,10,15,20,25],
            pageLength: 5,
          });
        }, 1);
    });

  }
  refresh(): void {
    window.location.reload();
}


delete(id:any){
  Swal.fire({
    title: 'Etes-vous sûr de supprimer l\'tilisateur?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#63b521',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Annuler',
    confirmButtonText: 'Oui, Supprimer !'
  }).then((result) => {
    if (result.isConfirmed) {
      this.wait()
      this.authService.supprimerUser(id).subscribe(data => {
        console.log(data);
        Swal.fire(
          'Supprimer!',
          'Utilisateur supprimer avec succès',
          'success'
        )
        this.refresh();
      });

    }
  })
}
wait(){
  Swal.fire({
    icon: 'info',
    title: 'Traitement en cours !'
  });
  Swal.showLoading();
}
}
