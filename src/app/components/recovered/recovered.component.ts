import { Component, OnInit } from '@angular/core';
import { ServiceLock } from 'src/app/services/service.lock';
import { timer } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recovered',
  templateUrl: './recovered.component.html',
  styleUrls: ['./recovered.component.scss'],
})
export class RecoveredComponent   {

  public checked :boolean=false;
  public email:string="";
  public finded :boolean=false;
  public showSpinner :boolean=false;
  public newPin:any;
  public newPinConfirm:any;

  constructor(
    public modal:ModalController,
    public emailService:ServiceLock ) { }
  
  searchEmail(){
   

    if (this.emailService.existPassword() && this.email !== ""){
         this.rotateSpinner()
      if(this.emailService.verifiedEmail(this.email) ){

        timer(1000).subscribe(()=>this.emailService.toastLock("Email encontrado",false,"tertiary","ios"))
        timer(2000).subscribe(()=>{
          this.finded=true
          timer(2000).subscribe(()=>this.emailService.toastLock("Ingresa un nuevo PIN",false, "success","ios"))
        })

      }
      else{
        timer(1000).subscribe(()=>this.emailService.toastLock("Email no encontrado",false,"danger","ios"))
      }
    }
    else{
      timer(1000).subscribe(()=>this.emailService.toastLock("Introduzca un email correcto",false,"light", "ios"))
    }

  }

  public async closeModal(){
    timer(300).subscribe(()=>this.modal.dismiss())
  }

  public rotateSpinner(){
    this.showSpinner=true;
    timer(1000).subscribe(()=>this.showSpinner=false)
  }

  public changePin(){

    this.verifiedPin()

  }

  public msjToast(msj:string, band:boolean=false,color="tertiary",mode="ios"){
    timer(1000).subscribe(()=>{
      this.emailService.toastLock(msj,band,color, mode)
    })
     this.rotateSpinner()
  }

  public verifiedPin(){
    let newPin = `${this.newPin}`, newPinConfirm = `${this.newPinConfirm}`;
   
    if (newPin.length == 4 && newPinConfirm.length == 4){
       if (newPin === newPinConfirm){

        this.msjToast("PIN actualizado", false, "success",  "ios")
        this.emailService.setPassword({pass:newPin,email:this.email})
        timer(1200).subscribe(()=>this.closeModal())
        
       }
       else{
        this.msjToast("El PIN  debe ser el mismo  ", false, "danger",  "ios")
       }

    }
    else{
      
      this.msjToast("Introduzca un PIN válido ", false, "danger",  "ios")
    }
  }


}
 