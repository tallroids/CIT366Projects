import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service'
import { Contact } from '../../contacts/contact.model';
@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  messageSender: string = "";
  @Input() message: Message;
  constructor(private ContactService: ContactService) { }

  ngOnInit() {
      let contact: Contact = this.ContactService.getContact(this.message.sender);
      this.messageSender = contact.name;
    }
  }

