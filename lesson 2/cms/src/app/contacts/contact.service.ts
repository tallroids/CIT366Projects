import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs/Subject'
@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[];
  currentContact: Contact = null;
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  
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
  
  addContact(newContact: Contact){
    if(!newContact){
      return
    }
    
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
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
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone)
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
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone)
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