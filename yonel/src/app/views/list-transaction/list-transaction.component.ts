import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import "datatables.net";
import "datatables.net-dt";

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
})
export class ListTransactionComponent implements OnInit{
  inputText='list-transaction';

  ngOnInit(): void {
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
  }

}
