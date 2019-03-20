import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  loggedInUser: any = {};
  userName:string ='';
  constructor() { }

}
