import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    private platform: Platform,private splashScreen: SplashScreen,private statusBar: StatusBar,  public userService: UserService
  ){}
  ngOnInit()
  {
    if(!localStorage.getItem('slider'))
    {
     localStorage.setItem('slider','True');
    }
  }
  readLocalStorageValue(key) {
    let value =   localStorage.getItem('slider');
    return value;
  }
  sliderClose()
  {
    localStorage.setItem('slider','False');
  }

}
