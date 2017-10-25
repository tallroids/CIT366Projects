import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model'
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact = null;
  constructor(private ContactService: ContactService) { }

  ngOnInit() {
    this.ContactService.contactSelectedEvent.subscribe(
    (contact: Contact) => {this.selectedContact = contact})
  }
}

