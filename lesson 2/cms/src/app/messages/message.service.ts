import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
//import { MOCKMESSAGES } from './MOCKMESSAGES';
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
  
  initMessages(){
    this.http.get('https://cms-f0a74.firebaseio.com/messages.json')
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
  
  storeMessages(){
    const messageString = JSON.stringify(this.messages.slice())
    let headers = new Headers({'Content-type':'application/json'});
    this.http.put('https://cms-f0a74.firebaseio.com/messages.json', messageString, {headers: headers})
      .subscribe(
        ()=>{
          this.messageChangeEvent.next(this.messages.slice())
        })
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
    this.messages.push(message);
    this.storeMessages();
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
