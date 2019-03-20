import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-label',
  templateUrl: 'label.page.html',
  styleUrls: ['label.page.scss']
})
export class LabelPage implements OnInit {
  visionData: any = {};
  imageData = 'https://www.sanger.ac.uk/sites/default/files/gaffney-group.jpg';
  constructor(private cameraService: CameraService) { }
  ngOnInit() {
    // console.log('OnInit');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    if (localStorage.getItem('imageData')) {
      this.imageData = 'data:image/jpeg;base64,' + localStorage.getItem('imageData');
    }
    this.visionData = this.cameraService.visionData;
  }
  captureImage() {
    this.cameraService.getPicture({});

  }
  browseImage() {
    const options = {
      'isBrowsed': true,
    };
    this.cameraService.getPicture(options);
  }
}
