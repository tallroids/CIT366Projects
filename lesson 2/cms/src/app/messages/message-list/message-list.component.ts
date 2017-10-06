import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model'

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(0, 'Test Subject', 'Hey, what\'s up?', 'Some Dude'),
    new Message(0, 'Test Subject', 'Not much, just messing around with angular', 'Ben Harker'),
    new Message(0, 'Test Subject', 'Woah, that\'s bomb', 'Some Dude')
    ]
  constructor() { }

  ngOnInit() {
  } 
  
  onNewMessage(message: Message){
    this.messages.push(message)
  }

}
