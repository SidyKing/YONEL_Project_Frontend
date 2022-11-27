import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import "datatables.net";
import "datatables.net-dt";
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
})
export class ListTransactionComponent implements OnInit{
  inputText='list-transaction';
  AllTransaction: any;
  AllPaiement: any;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getPaiement().subscribe(data => {
      this.AllPaiement = data;
      console.log(this.AllPaiement);
      setTimeout(() => {
        $('#list-transaction').DataTable({
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
