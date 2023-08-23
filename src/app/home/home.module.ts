import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ServiceNotes } from "../services/service.notes"
import { HomePageRoutingModule } from './home-routing.module';
import { ServiceCompleted } from '../services/service.completed';
import { BrowserModule } from '@angular/platform-browser';
// BrowserModule, BrowserAnimationsModule, HttpModule

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  providers: [
    ServiceNotes,ServiceCompleted
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
