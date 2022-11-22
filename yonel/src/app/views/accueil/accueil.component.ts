import { Component , OnInit} from '@angular/core';
import * as $ from 'jquery';
import "datatables.net";
import "datatables.net-dt";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
})
export class AccueilComponent implements OnInit {




  ngOnInit(): void {

    setTimeout(() => {
      $('#transaction').DataTable({
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
