import { NgModule } from '@angular/core';
import  {  CommonModule} from "@angular/common"
import { SettingHeaderComponent } from './setting-header/setting-header.component';
import { PhoneInfoComponent } from './phone-info/phone-info.component';
import { LicenceInfoComponent } from './licence-info/licence-info.component';
import { FontComponent } from './font/font.component';
import { SizesComponent } from './sizes/sizes.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { AlignmentComponent } from './alignment/alignment.component';
import { SpacedComponent } from './spaced/spaced.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

 
@NgModule({
  imports:[
    CommonModule,
    IonicModule,
    FormsModule,
    // BrowserModule,
  ],  
 
 
  declarations: [
    SettingHeaderComponent,
    PhoneInfoComponent,
    LicenceInfoComponent,
    FontComponent,
    SizesComponent,
    ColorPaletteComponent,
    AlignmentComponent,
    SpacedComponent

  ],
  exports: [
    SettingHeaderComponent,
    PhoneInfoComponent,
    LicenceInfoComponent,
    FontComponent,
    SizesComponent,
    ColorPaletteComponent,
    AlignmentComponent,
    SpacedComponent,
    CommonModule,
    IonicModule,
    FormsModule,
    // BrowserModule
  ] 
 
})
export class ComponentModule {}
