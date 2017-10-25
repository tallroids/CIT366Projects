import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model'
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[];
  constructor(private MessageService: MessageService) {
    this.messages = this.MessageService.getMessages();
  }

  ngOnInit() {
    this.MessageService.messageChangeEvent.subscribe(
    (messages) => {this.messages = messages}
    )
  } 
  
  onNewMessage(message: Message){
    this.messages.push(message)
  }

}
