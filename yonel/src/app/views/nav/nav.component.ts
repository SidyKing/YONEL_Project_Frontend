import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  @Input() inputFromParent : any;



  accueil="";transaction="";ListTransaction="";CreationClient="";


  ngOnInit(): void {
    this.test();
  }
  test(){
    if (this.inputFromParent!='accueil'){this.accueil="collapsed";}
    if (this.inputFromParent!='transaction'){this.transaction="collapsed";}
    if (this.inputFromParent!='list-transaction'){this.ListTransaction="collapsed";}
    if (this.inputFromParent!='creation-client'){this.CreationClient="collapsed";}
  }
}


