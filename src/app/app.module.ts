import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from './login/login.page';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { CameraService } from './services/camera.service';
import { VisionService } from './services/vision.service';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './services/loading.service';
import { HistoryPage } from './history/history.page';
import { ProfilePage } from './profile/profile.page';
@NgModule({
  declarations: [AppComponent, LoginPage, HistoryPage, ProfilePage],
  entryComponents: [LoginPage, HistoryPage, ProfilePage],
  imports: [
    BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    HTTP,
    CameraService,
    VisionService,
    LoadingService,
    { provide: StorageBucket, useValue: environment.firebase.storageBucket },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
