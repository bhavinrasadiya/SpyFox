import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { trigger, style, animate, transition, state, query, stagger } from '@angular/animations';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('slideInUpWithDelay', [
      state('in', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translate3d(0, 2000px, 0)'
        }),
        animate('0.5s')
      ])
    ])
  ],
})
export class LoginPage implements OnInit {
  auth = 'login';
  isOpen = true;
  slideOpts = {
    effect: 'flip',
  };
  slides: any;
  Item = new User;
  private userDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;
  currentUser: Observable<any>;
  loginForm: FormGroup;
  signupForm: FormGroup;
  constructor(private modalCtrl: ModalController, private afs: AngularFirestore, private userService: UserService) {

  }

  ngOnInit() {
    this.createForms();
  }
  segmentChanged(event) {
    this.auth = event.detail.value;
  }

  createForms() {
    this.signupForm = new FormGroup({
      mobile: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      name: new FormControl(''),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });
    this.loginForm = new FormGroup({
      mobile: new FormControl(''),
      password: new FormControl('')
    });
  }

  doLogin() {
    this.currentUser = this.afs.doc('users/' + this.loginForm.value.mobile).valueChanges();
    this.currentUser.subscribe((data: any) => {
      if (data) {
        if (data.password === this.loginForm.value.password) {
          this.userService.isLoggedIn = true;
          this.userService.loggedInUser = data;
          delete(data.password);
          localStorage.setItem('loggedInUser', JSON.stringify(data));
          this.userService.userName=data.name.charAt(0).toUpperCase();
          this.dismissModal();
        } else {
          alert('Bad Credentials');
        }
      } else {
        alert('Bad Credentials');
        return;
      }
    });
  }

  doSignup() {
    this.userDoc = this.afs.doc<User>('users/' + this.signupForm.value.mobile);
    this.currentUser = this.afs.doc('users/' + this.signupForm.value.mobile).valueChanges();
    this.currentUser.subscribe((data: any) => {
      if (data) {
        return;
      } else {
        const userData = this.signupForm.value;
        userData.history = [];
        this.userDoc.set(userData);
        alert('Signup Successful');
        this.signupForm.reset();
        this.auth = 'login';
      }
    });
  }
  
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
