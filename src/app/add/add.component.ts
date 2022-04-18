import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  newContact: Contact = new Contact();

  constructor(private contactService:ContactsService,private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    if(this.userService.isLoggedIn() === null){
      window.location.href = '/home';
    }
  }

  saveContact() {
    this.contactService.addContact(this.newContact).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/home']);
       }),(error)=>{
        console.log(error);
      }
  }

}
