import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Nom : string;
  Prenom : string;
  Tel : number;
  Date : Date;
  Contacts : Contact[];
  ContactToEdit : Contact = new Contact();
  editIndex : number;
  ContactToDelete : Contact = new Contact();
  deleteIndex : number;
  searchTerm : string;

  closeResult: string = '';

  constructor(private contactsService:ContactsService,private userService:UserService,
    private router:Router,private modalService: NgbModal) { }

  ngOnInit(): void {

    if(this.userService.isLoggedIn() !== null){
      this.contactsService.getContacts().subscribe(
        (response : Contact[])=>{
          this.Contacts = response;
        }
      )
      this.Date = new Date();
    }
    else{
      this.router.navigate(['/login']);
    }



  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  doSomething(){
  }

  editContact(index : number){
    this.ContactToEdit.id = this.Contacts[index].id;
    this.ContactToEdit.nom = this.Contacts[index].nom;
    this.ContactToEdit.prenom = this.Contacts[index].prenom;
    this.ContactToEdit.tel = this.Contacts[index].tel;
    this.editIndex = index;
  }

  confirmUpdate(){
    this.contactsService.updateContact(this.ContactToEdit).subscribe((response) => {
    var updatedContact = new Contact();
    updatedContact.id = response.id;
    updatedContact.nom = response.nom;
    updatedContact.prenom = response.prenom;
    updatedContact.tel = response.tel;
    this.Contacts[this.editIndex] = updatedContact;
    this.ContactToEdit.id = null;
    this.ContactToEdit.nom = null;
    this.ContactToEdit.prenom = null;
    this.ContactToEdit.tel = null;
    });
  }

  confirmDelete(index : number){
    this.ContactToDelete.id = this.Contacts[index].id;
    this.ContactToDelete.nom = this.Contacts[index].nom;
    this.ContactToDelete.prenom = this.Contacts[index].prenom;
    this.ContactToDelete.tel = this.Contacts[index].tel;
    this.deleteIndex = index;
  }

  deleteContact(){
    this.contactsService.deleteContact(this.ContactToDelete.id).subscribe((response) => {

    this.Contacts.splice(this.deleteIndex,1);
    this.ContactToDelete.id = null;
    this.ContactToDelete.nom = null;
    this.ContactToDelete.prenom = null;
    this.ContactToDelete.tel = null;
    });
  }

  findContact(){
    this.contactsService.findContact(this.searchTerm).subscribe((response : Contact[]) => {
        this.Contacts = response;
        this.searchTerm = '';
      });
  }

  ///////////////////////////////////////////////

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



}
