import { Component, OnInit } from '@angular/core';
import { ServiceLock } from 'src/app/services/service.lock';
import { Router } from '@angular/router'; 
import { timer, interval } from 'rxjs';
// import { LockGuard } from 'src/app/guard/lock.guard';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { RecoveredComponent } from 'src/app/components/recovered/recovered.component';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
  providers:[
    ServiceLock
  ]
})
export class SignPage  {
  public pass = ""
  pinOne?:any  = null;
  pinTwo?:any = null;
  pinThre?:any = null;
  pinFour?:any = null;

  private passToString :string = "";

  public openLock  = {
    on:false,
    text:'Lock'
  }

constructor(
  private toast:ToastController,
  private action:ActionSheetController,
  private lockService:ServiceLock,
  private router:Router, 
  private recoveredModal:ModalController,
  // private guard:LockGuard
  ) {  }
  
 private async recovered(){
    
  const modRecovered = await this.recoveredModal.create({
    component: RecoveredComponent
  })

  modRecovered.present()

 }
 
 

 public async recoveredSheet(){

    const action = await this.action.create({
      header: "Opciones de PIN",
      backdropDismiss:false,
      buttons: [
        {text: "Olvidé mi pin", handler: ()=> {timer(300).subscribe(()=>this.recovered())} },
        {text: "Cancelar", role:"cancel"}
      ]

    })
    action.present()
 }


 private open(){

 
    // this.guard.opn=true
    this.openLock.on= true
    this.openLock.text= "Unlock" 
    history.replaceState(null, "Reminder","/home/notes")
    this.router.navigate(["home/notes"])
  
  }

  async errorPassMsj(){
    const toastMsj = await this.toast.create({
         message: "PIN failed",
         duration:2000,
         color: 'danger',
         animated:true,
         mode:"ios"
       }
    )

    toastMsj.present();
  } 

  public resetPin(){
    this.pinOne  = null;
    this.pinTwo = null;
    this.pinThre = null;
    this.pinFour = null;
    this.passToString = "";
    this.errorPassMsj();

  }
  private unlock(){
   
    if(this.lockService.getPassword()[0].pass==this.passToString) timer(200).subscribe(()=>this.open())
    else timer(200).subscribe(()=>this.resetPin())
    
  }
  private verified(num:number){
 

    if(!this.pinOne){
      this.pinOne = num;
    }
    else if(!this.pinTwo){
      this.pinTwo  = num;
    }
    else if(!this.pinThre){
      this.pinThre  = num;
    }
    else if(!this.pinFour){
      this.pinFour  = num;
      
      this.passToString = this.pinOne+""+this.pinTwo+""+this.pinThre+""+this.pinFour
      this.unlock()
    }
    
  

  }
  public one(e:any){

    this.verified(parseInt(e.target.textContent));

  }
  public two(e:any){  
    this.verified(parseInt(e.target.textContent));

   }
  public thre(e:any){ 
    this.verified(parseInt(e.target.textContent));

    }
  public four(e:any){  
    this.verified(parseInt(e.target.textContent));

   }
  public five(e:any){  
    this.verified(parseInt(e.target.textContent));
     
   }
  public six(e:any){ 
    this.verified(parseInt(e.target.textContent));
     
   }
  public seven(e:any){ 
    this.verified(parseInt(e.target.textContent));
     
   }
  public eight(e:any){ 
    this.verified(parseInt(e.target.textContent));

    }
  public nine(e:any){ 
    this.verified(parseInt(e.target.textContent));
     
   }
  public zero(e:any){ 
    this.verified(e.target.textContent);
    
   }


}
