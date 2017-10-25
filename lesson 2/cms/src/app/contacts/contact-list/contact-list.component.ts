import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
 
  constructor(private ContactService: ContactService) { 
    this.contacts = this.ContactService.getContacts()
  }

  ngOnInit() {
  }

  onContactSelected(contact: Contact) {
   this.ContactService.contactSelectedEvent.emit(contact);
  }

}