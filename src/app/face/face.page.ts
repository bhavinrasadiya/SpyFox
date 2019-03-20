import { Component, AfterViewInit, ViewChild, Renderer } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-face',
  templateUrl: 'face.page.html',
  styleUrls: ['face.page.scss']
})
export class FacePage implements AfterViewInit {
  @ViewChild('myCanvas') canvas: any;
  image: any;
  canvasElement: any;
  imageObservable: Observable<any> = new Observable();
  constructor(public cameraService: CameraService, public platform: Platform, public renderer: Renderer) {
  }
  captureImage() {
    const options = {
      'canvasElement': this.canvasElement
    };
    this.cameraService.getPicture(options);
  }
  browseImage() {
    const options = {
      'isBrowsed': true,
      'canvasElement': this.canvasElement
    };
    this.cameraService.getPicture(options);
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.setAttribute('width', 350);
    this.canvasElement.setAttribute('height', 635);
  }
}
