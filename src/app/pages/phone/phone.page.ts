import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {
  public MODEL:any;
  public PLATFORM:any;
  public UUID:any;
  public VERSION:any;
  public MANUFACTURER:any;
  public SERIAL:any;


  constructor(public device:Device) {
    this.MODEL = this.device.model;
    this.PLATFORM = this.device.platform
    this.UUID = this.device.uuid
    this.VERSION = this.device.version
    this.MANUFACTURER=this.device.manufacturer
    this.SERIAL=this.device.serial
   }

  ngOnInit() {
  }
 
}
