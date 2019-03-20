import { Injectable, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { VisionService } from './vision.service';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { LoadingService } from './loading.service';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/user.model';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class CameraService {
  @ViewChild('myCanvas') canvas: any;
  downloadURL: Observable<string>;
  private userDoc: AngularFirestoreDocument<User>;
  currentUser: Observable<any>;
  captureOptions: CameraOptions = {
    quality: 100,
    targetWidth: 350,
    targetHeight: 635,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  browseOptions: CameraOptions = {
    quality: 100,
    targetWidth: 350,
    targetHeight: 635,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
  };
  base64Image: Observable<any> = new Observable();
  image: any;
  visionResponse: Observable<any> = new Observable();
  visionData: any;
  isImageCaptured = false;
  constructor(private camera: Camera, private storage: AngularFireStorage,
    private visionService: VisionService, public loadingService: LoadingService,
    private afs: AngularFirestore, private userService: UserService) {
  }

  getPicture(options) {
    if (options.isBrowsed) {
      this.base64Image = from(this.camera.getPicture(this.browseOptions));
    } else {
      this.base64Image = from(this.camera.getPicture(this.captureOptions));
    }
    this.base64Image.subscribe((data) => {
      this.loadingService.presentLoading();
      console.log('Captured');
      this.getDataFromVision(data);
      // Image tag src will set here for other tabs
      localStorage.setItem('imageData', data);
      this.visionResponse.subscribe((visionData) => {
        this.visionData = visionData.responses[0];
        if (options.canvasElement) {
          const image = new Image();
          image.setAttribute('src', 'data:image/jpeg;base64,' + data);
          setTimeout(() => {
            const ctx = options.canvasElement.getContext('2d');
            ctx.clearRect(0, 0, 350, 635);
            ctx.drawImage(image, 0, 0, 350, 635, 0, 0, 350, 635);
            if (visionData.responses[0].faceAnnotations) {
              this.drawRectOnCanvas(ctx, visionData.responses[0]);
            } else {
              this.loadingService.dismissLoading();

            }
            this.isImageCaptured = true;
          }, 0);
        }
      });

      if (localStorage.getItem('loggedInUser')) {
        this.uploadFile(this.getBlob(data, 'image/png', 512));
      }
    });
  }
  drawRectOnCanvas(ctx, visionResponse) {
    ctx.strokeRect(
      visionResponse.faceAnnotations[0].boundingPoly.vertices[0].x,
      visionResponse.faceAnnotations[0].boundingPoly.vertices[1].y,
      visionResponse.faceAnnotations[0].boundingPoly.vertices[1].x -
      visionResponse.faceAnnotations[0].boundingPoly.vertices[0].x,
      visionResponse.faceAnnotations[0].boundingPoly.vertices[2].y -
      visionResponse.faceAnnotations[0].boundingPoly.vertices[1].y);
    this.loadingService.dismissLoading();
  }
  getDataFromVision(imageData) {
    this.visionResponse = from(this.visionService.getData(imageData));
  }
  addToHistory(downloadUrl) {
    this.userDoc = this.afs.doc<User>('users/' + this.userService.loggedInUser.mobile);
    this.userService.loggedInUser.history.push({
      'date': new Date().getTime(),
      'url': downloadUrl
    });
    this.userDoc.update(this.userService.loggedInUser);
  }
  uploadFile(fileBlob) {
    let filePath: string;
    filePath = new Date().toUTCString();
    const file = fileBlob;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    const progress = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          console.log(url);
          this.addToHistory(url);
        });
      })
    )
      .subscribe();
  }

  getBlob(b64Data: string, contentType: string, sliceSize: number = 512) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
