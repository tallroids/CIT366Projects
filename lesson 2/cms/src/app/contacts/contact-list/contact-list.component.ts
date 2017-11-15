import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  subscription: Subscription;
  constructor(private ContactService: ContactService) { 
    this.contacts = this.ContactService.getContacts()
  }

  ngOnInit() {
    this.subscription = this.ContactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {this.contacts = contactList}
    )
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}