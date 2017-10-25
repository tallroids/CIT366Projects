import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[];
  currentContact: Contact = null
  
  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.contacts = this.contacts.sort(this.compareNames)
    this.currentContact = this.getContact("?");
  }

  getContacts(){
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
}
