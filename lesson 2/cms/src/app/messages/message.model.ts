export class Message{
  public id: string;
  public subject: string;
  public msgText: string;
  public sender: string;
  
  constructor(id, subject, msgText, sender){
    this.id = id;
    this.subject = subject;
    this.msgText = msgText;
    this.sender = sender;
  }
}