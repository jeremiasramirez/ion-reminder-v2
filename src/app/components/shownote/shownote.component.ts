import { Component,  Input } from '@angular/core'; 
import { ModalController, PopoverController } from '@ionic/angular';
import { ServiceNotes,modelNotes } from 'src/app/services/service.notes';
import { SizesComponent } from '../sizes/sizes.component';
import { FontComponent } from '../font/font.component';
import { ColorPaletteComponent } from '../color-palette/color-palette.component';
import { AlignmentComponent } from '../alignment/alignment.component';
import { SpacedComponent } from '../spaced/spaced.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-shownote',
  templateUrl: './shownote.component.html',
  styleUrls: ['./shownote.component.scss']
})
export class ShownoteComponent  {

  @Input() data: any;
  @Input() posEl:number=0;
  public showToolbar:boolean=true;
  public valueSizeFont:number=15;
  public valueFontFamily: string="arial"
  public valueColor:string="dark"
  public valueFontBold:number=400;
  public valueFontItalic:string="normal"
  public valueAligment:string = "normal"
  public valueSpaced:number=17;

  public stylesFromNotes =  
    {
      size:  15,
      font:"arial",
      color:"dark",
      fontBold:400,
      italic:"normal",
      alignment: "normal",
      spaced:17
    }
    
   
  constructor(
    public status:StatusBar,
    public popoverSize:PopoverController,
    public spacePopover:PopoverController,
    public serv:ServiceNotes,
    public font:PopoverController,
    public alignsPopover:PopoverController,
    public colorFont:PopoverController,
    public closeModalOpn:ModalController) { 
      
  } 
  ngOnDestroy(){this.status.show()}

  public hideBar(){
    this.status.hide();
    this.showToolbar=false
  }
  ngOnInit(){

    
    this.stylesFromNotes.size=this.data.size;
    this.stylesFromNotes.font=this.data.font;
    this.stylesFromNotes.color=this.data.colorFont;
    this.stylesFromNotes.fontBold=this.data.fontBold;
    this.stylesFromNotes.italic=this.data.italic;
    this.stylesFromNotes.alignment=this.data.alignment;
    this.stylesFromNotes.spaced=this.data.spaced;
  
  }
  public openFontBold(){
    
    if(this.stylesFromNotes.fontBold==400) this.stylesFromNotes.fontBold=600
    else this.stylesFromNotes.fontBold=400
  }

   
  public openFontItalic(){
    if (this.stylesFromNotes.italic=="normal") this.stylesFromNotes.italic="italic"
    else this.stylesFromNotes.italic="normal"
  } 

  public toolbar(){
    if(this.showToolbar) this.showToolbar=false
    else this.showToolbar=true
  }
 
 public async saveChange(){ 
 
    this.data.size=this.stylesFromNotes.size;
    this.data.font=this.stylesFromNotes.font;
    this.data.colorFont=this.stylesFromNotes.color;
    this.data.fontBold=this.stylesFromNotes.fontBold;
    this.data.italic=this.stylesFromNotes.italic;
    this.data.alignment=this.stylesFromNotes.alignment;
    this.data.spaced=this.stylesFromNotes.spaced
    this.serv.updateItem_(this.posEl, this.data)
   
  }
  public async closeMod(){
    this.saveChange()
    this.closeModalOpn.dismiss()
  }

  public async openSize(ev:any){
    const size = await this.popoverSize.create({
      component: SizesComponent,
      mode:"ios",
      event: ev
    })
 
    size.present();

    this.stylesFromNotes.size=( await (size.onDidDismiss())).data.data
   
  }

 
  public async openFontSpaced(ev:any){
    const space = await this.spacePopover.create({
      component: SpacedComponent,
      mode:"ios",
      event:ev
    })
    space.present()

    this.stylesFromNotes.spaced=( await (space.onDidDismiss())).data.data
  }

  public async openAlignment(ev:any){
    const aligns = await this.alignsPopover.create({
      component: AlignmentComponent,
      mode:"ios",
      event:ev
    })
    aligns.present()

    this.stylesFromNotes.alignment=( await (aligns.onDidDismiss())).data.data
  }

 public async openFont(ev:any){
    const font = await this.font.create({
      component: FontComponent,
      mode:"ios",
      event:ev
    })
    font.present()

    this.stylesFromNotes.font=( await (font.onDidDismiss())).data.data
  }

 public async openColor(ev:any){
    const colors = await this.colorFont.create({
      component: ColorPaletteComponent,
      mode:"ios",
      event:ev
    })
    colors.present()

    this.stylesFromNotes.color= (await colors.onDidDismiss()).data.colorToNote  
  }
}
