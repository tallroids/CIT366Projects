import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model'
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(0, "Ben Harker", "tallroids@gmail.com", "208-243-2679", "https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/user-512.png", null),
    new Contact(1, "Janae Harker", "tallroids@gmail.com", "208-243-2679", "https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/user-512.png", null)
  ];
  constructor() { }

  ngOnInit() {
  }

}
