import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { ContactService } from './contacts/contact.service';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsService } from './documents/documents.service';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DropdownDirective } from './dropdown.directive';
import { MessagesComponent } from './messages/messages.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageService } from './messages/message.service';
import { AppRoutingModule } from './app-routing';
import { DocumentViewComponent } from './documents/document-view/document-view.component';
import { DocumentEditComponent } from './documents/document-view/document-edit/document-edit.component';
import { WindRefService } from './wind-ref.service';
import { DndModule } from 'ng2-dnd';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentViewComponent,
    DocumentEditComponent,
    ContactEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DndModule.forRoot(),
  ],
  providers: [
    ContactService,
    DocumentsService,
    MessageService,
    WindRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
