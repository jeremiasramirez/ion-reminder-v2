import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { AndroidFullScreen } from '@ionic-native/android-full-screen/';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
 
// import {LockGuard} from "./guard/lock.guard"

// import { ServiceLock } from './services/service.lock';
import { ServiceNotes } from './services/service.notes';
import { Device } from '@ionic-native/device/ngx';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { ServiceWorkerModule } from '@angular/service-worker';
// import { environment } from '../environments/environment';
 
// ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
@NgModule({
  declarations: [AppComponent ],
  // entryComponents: [],
  imports: [IonicModule,
    BrowserModule,
     IonicModule.forRoot(), 
     CommonModule,
     FormsModule,
     AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StatusBar,
    SplashScreen,ServiceNotes,
    // LockGuard,
    Device,
    // AndroidFullScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // ServiceLock 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
