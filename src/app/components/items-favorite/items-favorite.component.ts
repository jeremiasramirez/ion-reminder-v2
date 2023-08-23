import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { modelNotes } from 'src/app/model/model.notes';
import { ServiceCompleted } from 'src/app/services/service.completed';
import { ServiceFavorite } from 'src/app/services/service.favorite';
import { ShownoteComponent } from '../shownote/shownote.component';

@Component({
  selector: 'app-items-favorite',
  templateUrl: './items-favorite.component.html',
  styleUrls: ['./items-favorite.component.scss'],
  providers: [
    ServiceFavorite,
    ServiceCompleted
  ]
})
export class ItemsFavoriteComponent implements OnInit {
  @Input() showSkeleton:boolean=true;
  @Input() notesFav:any;
  
  constructor(
    public modalAdd:ModalController,
    public service:ServiceFavorite,
    public serviceCompl:ServiceCompleted) { }

  ngOnInit() {
  
  }
  public async openNote(note:modelNotes, positionEl:number){
    const openNotes = await this.modalAdd.create({
      component: ShownoteComponent,
      mode: "ios",
      componentProps:  {data: note, posEl:positionEl}
    })
    openNotes.present()
  }

  public deleteItem(note:modelNotes,pos:number){
  
    this.serviceCompl.addNewComplete(note); 
    this.service.deleteItem(pos)
    this.notesFav.splice(pos,1)
  } 

}
