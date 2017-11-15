import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[];
  subscription: Subscription
  
  constructor(private DocumentsService: DocumentsService ) { 
    this.documents = this.DocumentsService.getDocuments()
  }

  ngOnInit() {
    this.subscription = this.DocumentsService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {this.documents = documentsList}
    )
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
