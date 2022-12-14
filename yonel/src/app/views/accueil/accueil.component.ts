import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import "datatables.net";
import "datatables.net-dt";
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
})
export class AccueilComponent implements OnInit {
  inputText='accueil';
  balance:any;
  totalTransaction:any;
  AllTransaction: any;
  userId: any;
  agenceCode:any;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.userId=sessionStorage.getItem('userId');

    this.authService.getUserById(this.userId).subscribe((data: any) => {
      this.agenceCode= data.sous_agence.agenceCode;
      this.authService.verifAgenceSurBalance(this.agenceCode).subscribe((resultat: any) => {
        this.balance=resultat.montant;
      });
    });

    this.authService.getTransactionByUserID(this.userId).subscribe((data: any) => {
      this.totalTransaction = data.length;
      console.log(data)
    });

    this.authService.getTransaction().subscribe((data: any) => {
      this.AllTransaction = data;
      setTimeout(() => {
        $('#list-transaction-fini').DataTable({
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


}
