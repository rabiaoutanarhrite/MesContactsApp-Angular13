import { Component } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TutoApp';

  logged : boolean = false;

  existingUser : User = new User();
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    if(this.userService.isLoggedIn() !== null){
      this.logged = true;
      this.existingUser = this.userService.isLoggedIn();
    }else{
      this.logged = false;
    }
  }

  logOut(){
    this.userService.signOut();
    this.logged = false;
    this.router.navigate(['/login']);
  }

}
