import { DatePipe } from '@angular/common';
import { Component, getPlatform, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
})
export class TransactionComponent implements OnInit {
  inputText='transaction';
  TransactionForm!:FormGroup;
  dateTransaction!:string;
  client1:any;
  client2:any;
  submitted = false;
  returnUrl!: string;
  AllDevises:any;
  AllPays:any;
  userId :any;
  hide = true;
  idTansaction!:string;
  emetteur:any;
  recepteur:any;
  message!:string;
  emetteurId: any;
  recepteurId: any;
  donne:any;


  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private datepipe: DatePipe
  ) {
    this.dateTransaction=this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss') as string;
   }

  ngOnInit(): void {
    this.userId=sessionStorage.getItem("userId");
      this.TransactionForm = this.formBulder.group(
        {
          emetteur:['',Validators.required],
          recepteur:['',Validators.required],
          pays_origine:['',Validators.required],
          pays_destination:['',Validators.required],
          devise_origine:['',Validators.required],
          devise_destination:['',Validators.required],
          montant:['',Validators.required],
          frais:['',Validators.required],
          plus:['+'],

      });

      this.authService.getDevises().subscribe(data => {
        this.AllDevises = data;
      });
      this.authService.getPays().subscribe(data => {
        this.AllPays = data;
      });
  }

  refresh(): void {
    window.location.reload();
  }
  get f() {
    return this.TransactionForm.controls;
  }

  get value() {
    return this.TransactionForm.controls;
  }
  beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
  }
  onSubmitTransaction() {
    this.submitted = true;
    if (this.TransactionForm.invalid) {
      console.log("invalid form")
      return;
    }
    else {
      this.emetteur= '+'+this.TransactionForm.value.emetteur
      this.authService.verifEmetteur(this.emetteur).subscribe(
        data => {
          this.client1=data;
          if(this.client1==null){
          this.alertBadEmetteur();
          }
          else{
            this.emetteurId=this.client1.id;
            this.recepteur= '+'+this.TransactionForm.value.recepteur
            this.authService.verifRecepteur(this.recepteur).subscribe(
              data => {
                this.client2=data;
               if(this.client2==null){
                    this.alertBadRecepteur();
                 }
                 else{
                  this.recepteurId=this.client2.id;
                  this.authService.transaction(
                    this.TransactionForm.value.montant,
                    this.dateTransaction,
                    this.TransactionForm.value.frais,
                    "Transmitted",
                    this.userId,
                    this.emetteurId,
                    this.recepteurId,
                    this.TransactionForm.value.devise_origine,
                    this.TransactionForm.value.devise_destination,
                  ).subscribe(
                    (resultat) => {
                      //sessionStorage.setItem('idTansaction',resultat.id);
                      this.donne=resultat;
                      this.submitted = false;
                      this.TransactionForm.reset();
                      this.alertGood();
                      this.wait();
                      setTimeout(()=>{                                     // <<<---using ()=> syntax
                        this.authService.UpdateTransaction(
                          this.donne.id,
                          this.donne.montant,
                          this.dateTransaction,
                          this.donne.frais,
                          "Payable",
                          this.userId,
                          this.emetteurId,
                          this.recepteurId,
                          this.donne.devise_origine,
                          this.donne.devise_destination
                          ).subscribe(
                            (resultat) => {
                              console.log(resultat)
                              this.alertGood();
                              this.router.navigate(['/ListeTransaction']);
                            }
                        )
                    }, 40000);
                    },
                    (error) => {
                      console.log(error);
                    this.alertBad();
                    }
                  );
                 }
              }
            )
          }
        }
      );

    }
  }

  reset(){
    this.submitted=false;
    this.TransactionForm.reset();
  }
  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      this.beep();
      //invalid character, prevent input

    }
  }
  alertGood(){
    Swal.fire({
      icon: 'success',
      title: 'Transaction Réussie !',
      showConfirmButton: false,
      timer: 1200

    })
  }
  alertBad(){
    Swal.fire({
      icon: 'error',
      title: 'Erreur...',
      text: 'Echec de la transaction'
    })
  }
  alertBadEmetteur(){
    Swal.fire({
      icon: 'error',
      title: 'Numéro client1 incorrect !',
      text: "Si vous n'avez pas de compte veuillez le créer"
    })
  }
  alertBadRecepteur(){
    Swal.fire({
      icon: 'error',
      title: 'Numéro client2 incorrect !',
      text: "Si vous n'avez pas de compte veuillez le créer"

    })
  }
  wait(){
    Swal.fire({
      icon: 'info',
      title: 'Traitement en cours!',
      text: 'Dans 40 secondes la transaction sera payable!  Attention de ne pas l\'interrompre '
    });
    Swal.showLoading();
  }
}
