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
    this.http.get('https://cms-f0a74.firebaseio.com/contacts.json').map(
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
    
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }
  
  updateContact(originalContact: Contact, newContact: Contact){
    if((!originalContact) || (!newContact)){
      return
    }
    
    const pos = this.contacts.indexOf(originalContact)
    if (pos < 0){
      return
    }
    
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts()
  }
  
  deleteContact(contact: Contact){
    if (!contact) {
      return;
    }
    
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
  
  storeContacts(){
    const contactString = JSON.stringify(this.contacts.slice())
    let headers = new Headers({'Content-type':'application/json'});
    this.http.put('https://cms-f0a74.firebaseio.com/contacts.json', contactString, {headers: headers})
      .subscribe(
        ()=>{
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