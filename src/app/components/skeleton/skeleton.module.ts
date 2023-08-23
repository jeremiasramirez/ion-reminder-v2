import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
 
    IonicModule,
    FormsModule,
    // BrowserModule
  ],
  declarations: [
    SkeletonComponent
  ],
  exports: [
    SkeletonComponent,
    CommonModule,
    IonicModule,
    FormsModule,
    // BrowserModule
  ]

})
export class SkeletonModule {}
