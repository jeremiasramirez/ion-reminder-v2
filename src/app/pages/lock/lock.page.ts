import { Component, OnInit } from '@angular/core';
import { ServiceLock } from 'src/app/services/service.lock';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { ToastController } from '@ionic/angular';
import { timer, interval } from 'rxjs';



@Component({
  selector: 'app-lock',
  templateUrl: './lock.page.html',
  styleUrls: ['./lock.page.scss'],
  providers: [
    ServiceLock
  ]
})
export class LockPage implements OnInit {
  public formGroups :any
  public validators = Validators
  public existLock : boolean=false;
  

  public changeTruthy : boolean = false;
  public hideForm:any = null
  public showPin:boolean=false;
  public hideForm2:any = null
  public showPin2:boolean=false;

  constructor(
    public lock:ServiceLock,
    public toast:ToastController
    ) { 
    this.initValidation()
  }

  public initValidation(){

      let validationArray = [
        this.validators.required,
        this.validators.maxLength(4),
        this.validators.minLength(4)
      ];

      let validationArrayEmail = [
        this.validators.email,
        this.validators.required,
        this.validators.maxLength(30),
        this.validators.minLength(8)
      ]

      this.formGroups= new FormGroup({
        
        email: new FormControl(null, validationArrayEmail),
        pin: new FormControl(null,  validationArray),
        pinConfirm: new FormControl(null, validationArray)

      })

  }

  ngOnInit() {
    this.existLock = this.lock.existPassword()
    interval(1000).subscribe(()=> this.existLock = this.lock.existPassword())
  }

  ngOnDestroy(){
    this.showPin=false;
    this.showPin2=false
  }

  public async changeToast(message:string){
   
    const toasts = await this.toast.create({

      message: message, 
      color:"tertiary",
      position: "top",
      duration: 5000,
      buttons: [{text:'OK',  handler: ()=>toasts.dismiss()}]

    })

    toasts.present()

  }

  public resetForm(){
    this.formGroups.value.pin = null
    this.formGroups.value.pinConfirm = null 
    this.formGroups.value.email = null 
  }
  public addPin(){
   
    if ( (this.formGroups.controls.email.valid) && (this.formGroups.controls.pin.valid) && (this.formGroups.controls.pinConfirm.valid)){
      
      if(this.formGroups.value.pin === this.formGroups.value.pinConfirm){

          let data = {
            pass: this.formGroups.controls.pin.value,
            email: this.formGroups.controls.email.value
          }
         
          this.lock.setPassword(data); 
          this.existLock =  this.lock.existPassword()
          this.showAddPin()
          this.resetForm()
        
      }
      else{
        this.changeToast("El pin debe ser el mismo.")
      }

    }
    else{
      this.changeToast("Pin o Email Invalido.")
    }
    
  }

  public showAddPin(){
    if (this.showPin === true){
      this.hideForm="hideFormPin";
      timer(400).subscribe(()=>this.showPin = false);
    }
    else{ this.showPin = true; this.hideForm="";} 
  }

  public showUpdatePin(){
    if (this.showPin2 === true){
      this.hideForm2="hideFormPin";
      timer(400).subscribe(()=>this.showPin2 = false);
    }
    else{ this.showPin2 = true; this.hideForm2="";} 
  }
  
  public changePin(){
    this.showUpdatePin()
  }
  public  updatePin(){
    if (  (this.formGroups.controls.email.valid) && (this.formGroups.controls.pin.valid) && (this.formGroups.controls.pinConfirm.valid) ){
      
      if((this.formGroups.value.pin == this.lock.getPassword()[0].pass) && this.formGroups.value.pinConfirm){


          let data = {
            pass: this.formGroups.controls.pinConfirm.value,
            email: this.formGroups.controls.email.value
          }
          
          this.lock.setPassword(data);
          this.existLock =  this.lock.existPassword()
          this.showUpdatePin()
          timer(300).subscribe(()=> this.changeToast("Pin actualizado"))
          this.resetForm()

      }
      else{
        this.changeToast("Pin actual incorrecto.")
      }

    }
    else{
      this.changeToast("Pin o Email Invalido.")
    }
    
  }
  public deletePassword(){
    this.lock.removePassword()
    this.showPin=false;
    this.showPin2=false
 
  }

  public cancelPin(){
    this.showPin=false;
    this.showPin2=false
  }


}










