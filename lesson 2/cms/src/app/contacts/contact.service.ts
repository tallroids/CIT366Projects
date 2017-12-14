import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs/Subject'
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  
  constructor(private http: Http) { 
    this.initContacts();
  }
  
  initContacts(){
    this.http.get('http://localhost:3000/contacts').map(
        (response: Response) => {
          const contacts: Contact[] = response.json();
          return contacts;
        }
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
//          this.contacts = this.contacts.sort(this.compareNames)
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(contacts.slice())
        }
      )
  }

  getContacts(): Contact[]{
    return this.contacts.slice();
  }
  
  compareNames(contactA: Contact, contactB: Contact){
    if(contactA.name < contactB.name)
      return -1;
    if(contactA.name > contactB.name)
      return 1;
    return 0;
  }
  
  getContact(id: string): Contact{
    for(let contact of this.contacts){
      if(contact.id === id){
        return contact
      }
    }
  }
  
  addContact(newContact: Contact){
    if(!newContact){
      return
    }
    
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    
    newContact.id = '';
    const strContact = JSON.stringify(newContact);
    
    this.http.post('http://localhost:3000/contacts', strContact, {headers: headers})
    .map((response: Response) => {
      return response.json()
    })
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.contactListChangedEvent.next(this.contacts.slice())
    })
  }
  
  updateContact(originalContact: Contact, newContact: Contact){
    if((!originalContact) || (!newContact)){
      return
    }
    
    const pos = this.contacts.indexOf(originalContact)
    if (pos < 0){
      return
    }
    
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    
    const strContact = JSON.stringify(newContact);
    
    this.http.patch('http://localhost:3000/contacts/' + originalContact.id, strContact, {headers: headers})
    .map((response: Response) => {
      return response.json()
    })
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.contactListChangedEvent.next(this.contacts.slice())
    })
  }
  
  deleteContact(contact: Contact){
    if (!contact) {
      return;
    }
    
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
    .map((response: Response) => {
      return response.json()
    })
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.contactListChangedEvent.next(this.contacts.slice())
    })
  }
  
  getMaxId():number{
    let maxId = 0;
    this.contacts.forEach(function(contact){
      const currentId: number = Number(contact.id);
      if(currentId > maxId){
        maxId = currentId;
      }
    });
    return maxId;
  }
}
// ****************** I am on page 10