import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  newUser : User = new User();

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.newUser.email = null;
    this.newUser.password = null;

    if(this.userService.isLoggedIn() !== null){
      this.router.navigate(['/home']);
     }
  }

  formIsValid(){
    return (this.newUser.email !== null && this.newUser.password !== null)
        && (this.newUser.email.length !== 0 && this.newUser.password.length !== 0)
  }

  submitForm(){
    this.userService.signUp(this.newUser).subscribe(response => {
      this.newUser.email = null;
      this.newUser.password = null;
      localStorage.setItem('user',JSON.stringify(response));
      window.location.href = '/home';
    });
  }

}
