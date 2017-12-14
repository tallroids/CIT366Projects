import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MessageService {
  messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: Http) {
  this.initMessages();
  }

  initMessages() {
    this.http.get('http://localhost:3000/messages')
      .map(
        (response: Response) => {
          const messages: Message[] = response.json();
          return messages;
        }
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangeEvent.next(messages.slice())
        }
      );
  }
  
  getMessages(): Message[]{
    return this.messages.slice();
  }

  getMessage(id: string): Message{
    for(let message of this.messages){
      if(message.id === id){
        return message;
      }
    }
  }
  
  addMessage(message: Message){
    if(!message){
      return
    }
    
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    
    message.id = '';
    const strMessage = JSON.stringify(message);
    
    this.http.post('http://localhost:3000/messages', strMessage, {headers: headers})
    .map((response: Response) => {
      return response.json()
    })
    .subscribe((messages: Message[]) => {
      this.messages = messages;
      this.messageChangeEvent.next(this.messages.slice())
    })
  }

  getMaxId(){
    let maxId = 0;
    this.messages.forEach(function(message){
      const currentId: number = Number(message.id);
      if(currentId > maxId){
        maxId = currentId;
      }
    });
    return maxId;
  }
}
