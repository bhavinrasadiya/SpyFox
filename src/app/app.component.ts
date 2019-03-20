import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ModalController } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { UserService } from './services/user.service';
import { HistoryPage } from './history/history.page';
import { ProfilePage } from './profile/profile.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalController: ModalController,
    public userService: UserService
  )
   {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      localStorage.removeItem('imageData');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    if (localStorage.getItem('loggedInUser')) {
      this.userService.isLoggedIn = true;
      this.userService.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      this.userService.userName=this.userService.loggedInUser.name.charAt(0).toUpperCase();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  async presentHistoryModal() {
    const modal = await this.modalController.create({
      component: HistoryPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  doLogout() {
     this.userService.isLoggedIn = false;
    this.userService.loggedInUser = {};
    localStorage.removeItem('loggedInUser');
  }

}
