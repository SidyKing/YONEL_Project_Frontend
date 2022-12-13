import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  @Input() inputFromParent : any;



  accueil="";transaction="";ListTransaction="";CreationClient="";CreerUser="";CreerAgence="";CreerSousAgence="";Home="";


  ngOnInit(): void {
    this.test();
  }
  test(){
    if (this.inputFromParent!='accueil'){this.accueil="collapsed";}
    if (this.inputFromParent!='transaction'){this.transaction="collapsed";}
    if (this.inputFromParent!='list-transaction'){this.ListTransaction="collapsed";}
    if (this.inputFromParent!='creation-client'){this.CreationClient="collapsed";}
    if (this.inputFromParent!='creer-user'){this.CreerUser="collapsed";}
    if (this.inputFromParent!='home'){this.Home="collapsed";}
    if (this.inputFromParent!='creer-agence'){this.CreerAgence="collapsed";}
    if (this.inputFromParent!='creer-sous-agence'){this.CreerSousAgence="collapsed";}
  }
}


