import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-alignment',
  templateUrl: './alignment.component.html',
  styleUrls: ['./alignment.component.scss'],
})
export class AlignmentComponent implements OnInit {
 

  public arrAligns = [
    {name: 'Text Center', value:'center'},
    {name: 'Text Left', value:'left'},
    {name: 'Justify', value:'justify'},
    {name: 'Text Right', value:'right'},
    {name: 'Text End', value:'end'},
    {name: 'Text Start', value:'start'},
    {name: 'Normal', value:'left'},
  ]
  constructor(
    public closeSize:PopoverController
  ) { }

  ngOnInit() {}
  
  public async align(e:string){
     
    this.closeSize.dismiss({data:e});
  }

}
