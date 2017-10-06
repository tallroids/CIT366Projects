import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  constructor() { }

  ngOnInit() {
  }
  
  onSendMessage(){
  const currentSender = 'Ben Harker';
  const id = 0;
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(id, subject, msgText, currentSender);
    this.addMessageEvent.emit(newMessage)
  }
  
  onClear(){
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }

}
