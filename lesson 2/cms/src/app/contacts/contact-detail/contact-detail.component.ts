import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model'

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = new Contact(0, "Ben Harker", "tallroids@gmail.com", "208-243-2679", "https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/user-512.png", null);

  constructor() { }

  ngOnInit() {
  }

}
