import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  history: any = [];
  constructor(private modalCtrl: ModalController, public userService: UserService) { }

  ngOnInit() {
    this.history = this.userService.loggedInUser.history;
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
