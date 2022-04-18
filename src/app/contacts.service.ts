import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<Contact[]>{
    // var contacts = [
    //   // {nom : "Ahmed", prenom : "Yazim", tel : "066666656",state:"active"},
    //   // {nom : "Rabie", prenom : "Samir", tel : "066666656",state:"inactive"},
    //   // {nom : "Mahoum", prenom : "Majid", tel : "066666656",state:"active"},
    //   // {nom : "Karim", prenom : "Sarit", tel : "066645826",state:""}
    // ]

    return this.httpClient.get<Contact[]>("http://localhost/contacts-php-api/get_contacts.php");
  }

  addContact(newContact: Contact):Observable<Contact>{
    return this.httpClient.post<Contact>("http://localhost/contacts-php-api/add_contacts.php", newContact);
  }
  updateContact(editContact: Contact):Observable<Contact>{
    return this.httpClient.put<Contact>("http://localhost/contacts-php-api/update_contacts.php", editContact);
  }

  deleteContact(contactId: number):Observable<Object>{
    return this.httpClient.delete<Object>("http://localhost/contacts-php-api/delete_contacts.php?id="+ contactId);
  }

  findContact(searchTerm: string):Observable<Contact[]>{
    return this.httpClient.get<Contact[]>("http://localhost/contacts-php-api/find_contacts.php?term="+ searchTerm);
  }
}
