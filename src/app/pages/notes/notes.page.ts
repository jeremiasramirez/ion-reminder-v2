import { Component  } from '@angular/core'; 
import { ServiceNotes,modelNotes } from 'src/app/services/service.notes';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { NoteComponent } from '../../components/note/note.component'; 
import { ShownoteComponent } from 'src/app/components/shownote/shownote.component';
import { ServiceCompleted } from 'src/app/services/service.completed';
import { FeatureService } from 'src/app/services/service.feature';
 
import { StatusBar } from '@ionic-native/status-bar/ngx'; 

import { interval, timer } from 'rxjs';
import { ServiceFavorite } from 'src/app/services/service.favorite';
 
 

@Component({
  
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  providers: [ServiceCompleted,FeatureService,ServiceFavorite]

})
export class NotesPage   {
  public allNotes;
  public endValue:number=10
  public searchData:string = ""
  public searchShow:boolean=true;
  public show:boolean=false;
  public syncing:boolean=true;


  //timings
  public timingShow:any;
  public timingVerifiedNotesDeletes:any;
  public timingSync:any;
  public timingMore:any;

  constructor(
    public favorite:ServiceFavorite,
    public status:StatusBar,
    public service:ServiceNotes,
    public serviceCompl:ServiceCompleted,
    public feature:FeatureService, 
    public modalAdd:ModalController,
    public action:ActionSheetController,

    public detail:AlertController
    ) { 
      this.allNotes = this.service.notes;
      this.status.backgroundColorByHexString('#5260ff');
  }
 
  ngOnInit(){
   this.timingShow= timer(1000).subscribe(()=>this.show=true);

   this.timingVerifiedNotesDeletes= interval(30000).subscribe(()=>{
      this.sync()
 
    });
 
  
  }
 
  public async openAdd(){
   
    const modalAdds = await this.modalAdd.create({
      component: NoteComponent
    })
    modalAdds.present()
  }
  
  public getDates(data:any):any{
    data=data.substring(0,10)
    return new Date(data)  
  }

   public async sync(){
    this.syncing=true;
    this.timingSync=  timer(4000).subscribe(()=>{ this.syncing=false  })  
  }


  public async openNote(note:modelNotes, positionEl:number){
    const openNotes = await this.modalAdd.create({
      component: ShownoteComponent,
      mode: "ios",
      componentProps:  {data: note, posEl:positionEl}
    })
    openNotes.present()
  }

  public async detailNote(note:modelNotes){
 
    const details =await this.detail.create({
      header: "Creación",
      subHeader: "Fecha de creación",
      message: this.getDates(`${note.date}`),
      buttons:[
        {text:"Entendido",role: "cancel"}
      ]
    })
    details.present()
  }

  public async aboutNotWrite(){
    const about =await this.detail.create({
      header: "Info de notas",
      subHeader: "Edición de notas",
      message: "Las notas en Favoritos y en papelera no pueden ser editadas.",
      buttons:[
        {text:"OK",role: "cancel"}
      ]
    })
    about.present()
  }
 public async openSheetMore(note:modelNotes,pos:number){
    
    const actions = await this.action.create({
      header: "Opciones",
      mode:"ios",
      buttons:  [
        
        {text: "",icon:'heart-outline', handler: ()=>this.setFavorite(note,pos)},
        {text: "Detalles", handler: ()=>this.detailNote(note)},
        {text: "Acerca de", handler: ()=>this.aboutNotWrite()},
        {text: "Cancel", role:"cancel"}

      ]

    })
    actions.present()

  } 
  public acceptRemove(note:any,pos:number){
    this.feature.createToast("Delete", "Enviada a papelera", "success");
    this.serviceCompl.addNewComplete(note); 
    this.service.deleteItem(pos)
  }
  public async deleteItem(note:any,pos:number){
    const removeItem = await this.detail.create({
      header: "Mover a papelera",
      message: "Realmente quieres remover este elemento?",
      buttons: [
        {text: "Remover", handler: ()=>this.acceptRemove(note,pos)},
        {text: "Cancelar", role:"cancel"}
      ]
    })
    removeItem.present();
  }

   
  public setFavorite(note:any,pos:number){
    this.feature.createToast("Favorite", " " +" Agregada a favoritos", "success");
    this.favorite.addNew(note); 
    this.service.deleteItem(pos)
  }
 



  public moreItem(e:any){

    this.timingMore = timer(500).subscribe(()=>{
      e.target.complete()
      this.endValue+=10
    })

  }
}
