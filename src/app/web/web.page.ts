import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-web',
  templateUrl: 'web.page.html',
  styleUrls: ['web.page.scss']
})
export class WebPage {
  visionData: any = {};
  imageData = 'https://www.sanger.ac.uk/sites/default/files/gaffney-group.jpg';
  constructor(private cameraService: CameraService) { }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    if (localStorage.getItem('imageData')) {
      this.imageData = 'data:image/jpeg;base64,' + localStorage.getItem('imageData');
    }
    this.visionData = this.cameraService.visionData;
  }
  captureImage() {
    const options = {};
    this.cameraService.getPicture(options);
  }
  browseImage() {
    const options = {
      'isBrowsed': true
    };
    this.cameraService.getPicture(options);
  }
}
