import { Component, Inject, OnInit } from '@angular/core';
import { FeatureService } from 'src/app/services/service.feature';
import { AlertController, ModalController } from '@ionic/angular';
import { modelNotes } from 'src/app/model/model.notes';
import { ServiceNotes } from 'src/app/services/service.notes';
import { ServiceCompleted } from 'src/app/services/service.completed';
import { ShownoteComponent } from 'src/app/components/shownote/shownote.component';
import { timer } from 'rxjs';
import { StatusBar } from '@ionic-native/status-bar'
// import { StatusBar } from '@ionic-native/status-bar/ngx'; 
@Component({
  selector: 'app-trash',
  templateUrl: './trash.page.html',
  styleUrls: ['./trash.page.scss'],
  providers: [
    FeatureService,ServiceCompleted
  ]
})
export class TrashPage implements OnInit {

  public completeItems:modelNotes[];
  public show :boolean= false;
  // public startValue:0;
  public endValue:number=10;

  constructor(public statusBar: StatusBar,
    public feature:FeatureService,
    public modalAddFromTrash:ModalController,
    public confirmDelete:AlertController,
    public completedNot:ServiceCompleted ) {
   
      
      this.completeItems = this.completedNot.completed
      this.completeItems = JSON.parse(localStorage.getItem("completed")||"{}") 
      
  }

  ngOnInit() {
    timer(400).subscribe(()=>this.show=true)
       
    this.statusBar.backgroundColorByHexString("#eb445a")
  }
  ngOnDestroy(){
    this.statusBar.backgroundColorByHexString('#5260ff');
  }
  public deleted(note:any,pos:any){
    this.completedNot.deleteNoteComplete(pos)
    this.completeItems.splice(pos,1)
    this.feature.createToast("Delete",note.title+" ha sido borrada", "danger");
  }
  public async deleteItem(note:any,pos:any){
    
    const confirm= await this.confirmDelete.create({
      header: "Eliminar",
      subHeader: "Eliminar de manera permanente",
      message: "Deseas continuar ?",
      buttons: [
        { text: "Eliminar",  handler:()=>{ this.deleted(note,pos) }},
        { text: "Cancelar", role:"cancel"}
      ]
    })
    confirm.present();
  }
 /* restore(note, pos){
    this.feature.createToast("Restore",note.title+" Ha sido restaurada", "success");
    this.completedNot.deleteNoteComplete(pos)
   // this.noteServ.addNew(note)
  }*/

  async openNote(note:modelNotes, positionEl:number){
    const openNotes = await this.modalAddFromTrash.create({
      component: ShownoteComponent,
      mode: "ios",
      componentProps:  {data: note, posEl:positionEl}
    })
    openNotes.present()
  }


 private refresh(e:MouseEvent){
    this.completeItems = []
    this.show=false
      timer(400).subscribe(()=>{
        this.completeItems = JSON.parse(localStorage.getItem("completed")||"{}") 
       // e.target.complete()
        this.show=true
      })
    
  }

  public moreItem(e:any){
    
    timer(600).subscribe(()=>{
      e.target.complete();
      this.endValue+=10
    })
    
  }
   

}
