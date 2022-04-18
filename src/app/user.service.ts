import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  existUser : User = new User();

  constructor(private httpClient: HttpClient) { }

  signUp(newUser:User):Observable<User>{
    return this.httpClient.post<User>("http://localhost/contacts-php-api/register.php", newUser);
  }

  signIn(newUser:User):Observable<User>{
    return this.httpClient.post<User>("http://localhost/contacts-php-api/login.php", newUser);
  }

  isLoggedIn(){
    return JSON.parse(localStorage.getItem('user')) || null;
  }

  signOut(){
    localStorage.clear();
  }
}
