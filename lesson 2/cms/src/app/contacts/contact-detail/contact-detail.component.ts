import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() selectedContact: Contact;
  id: string;
  
  constructor(private ContactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.selectedContact = this.ContactService.getContact(this.id);
        }
      );
  }
  
  onDelete(){
    this.ContactService.deleteContact(this.selectedContact);
    this.router.navigate(['/contacts'])
  }

}
