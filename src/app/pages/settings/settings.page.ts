import { Component, OnInit } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar/ngx'; 
import { settings } from 'src/app/services/service.settings'; 
import { DarkMode } from 'src/app/services/service.dark';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  public configs:any;
  public searchValue:string|number = "";
  constructor(  
    public status:StatusBar,
    public them:DarkMode) { 
    this.status.backgroundColorByHexString('#5260ff');
  }

  ngOnInit() {
    this.configs = settings
    
  }

  public changeTheme(){
    this.them.changeTheme()
  }

  
}

