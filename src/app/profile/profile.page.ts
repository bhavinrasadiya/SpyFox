import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private modalCtrl: ModalController,public userService: UserService) { }
  abc:String;


  ngOnInit() {
    var a =this.userService.loggedInUser.name;
    this.abc=a.charAt(0);
  
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
