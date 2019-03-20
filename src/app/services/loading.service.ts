import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: any;
  constructor(public loadingController: LoadingController) { }

async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait we are processing your image...',
      spinner: 'crescent',
      translucent: true
    });
    return await this.loading.present();
  }

  async dismissLoading() {
    this.loading.dismiss();
  }
}
