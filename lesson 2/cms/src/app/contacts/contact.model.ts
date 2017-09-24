export class Contact{
  public contactId: number;
  public name: string;
  public email: string;
  public phone: string;
  public imageUrl: string;
  public group: Contact[];
  
  constructor(contactId, name, email, phone, imageUrl, group){
    this.contactId = contactId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group = group;
  }
}