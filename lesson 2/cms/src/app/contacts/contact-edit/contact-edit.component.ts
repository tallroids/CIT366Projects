import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = true;
  hasGroup: boolean = false;
  invalidGroupContact: boolean;
  
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          let id = params['id'];
          if (!id) {
            this.editMode = false;
          } else {
            this.originalContact = this.contactService.getContact(id);
            if (!this.originalContact) {
              return
              } else {
                this.contact = JSON.parse(JSON.stringify(this.originalContact));
                if(this.contact.group !== null){
                  this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group.slice()))
                }
              }
          }
          
        }
      );
  }
  
  onSubmit(form){
    const values = form.value;
    const newContact = new Contact(null, values.name, values.email, values.phone, values.imageUrl, this.groupContacts);
        
    if(this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts'])
  }
  
  onCancel(){
    this.router.navigate(['/contacts'])
  }
  
  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }
    
    if(this.editMode && newContact.id === this.contact.id){
      return true;
    }
    
    for(let i=0; i<this.groupContacts.length; i++){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    
    return false;
  }
  
  addToGroup($event: any){
    console.log($event)
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if(this.invalidGroupContact){
      return
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }
  
  onRemoveItem(idx: number){
    if(idx < 0 || idx >= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
