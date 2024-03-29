import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/splash-screen/ngx/s'; 
import { DarkMode } from './services/service.dark';
import { timer } from 'rxjs';
// import { StatusBar } from '@ionic-native/statu'; 
import { StatusBar } from '@ionic-native/status-bar';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[
    DarkMode,
    StatusBar
  ] 
})
export class AppComponent {
  public numTrash : number=0;
  public numNotes : number=0;
  public numFavs:  number=0;
  public checkedDark : boolean =  false;
  constructor(
    private menu:MenuController, 
    private platform: Platform,
    private splashScreen: SplashScreen,
      private statusBar: StatusBar,
    private dark:DarkMode
    
  ) {
    this.initializeApp();
 
   
    
   
    this.setterNums()
  }

  ngOnInit():void{
    this.checkedDark = this.dark.existDark()
     

  }

  setterNums(){
    setInterval(()=>{
       
      if(JSON.parse(localStorage.getItem("favorite") || '{}')) {
        this.numFavs = JSON.parse(localStorage.getItem("favorite") || '{}').length
      }
      if(JSON.parse(localStorage.getItem("notes") || '{}')){
        this.numNotes = JSON.parse(localStorage.getItem("notes") || '{}').length
      }
      if(JSON.parse(localStorage.getItem("completed") || '{}')){
        this.numTrash = JSON.parse(localStorage.getItem("completed") || '{}').length
      }
  
    },2000)
  }
  getdarks(){
       this.dark.lightOrDark()
  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false); 
      this.statusBar.backgroundColorByHexString('#5260ff');
      this.splashScreen.hide();
    });
  }

  closeMenu(){
    timer(200).subscribe(()=>this.menu.close())
  }
}
