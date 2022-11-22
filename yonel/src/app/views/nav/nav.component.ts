import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  @Input() inputFromParent : any;



  accueil="";


  ngOnInit(): void {
    this.test();
  }
  test(){
    if (this.inputFromParent=='accueil'){this.accueil="active";}
  }
}


