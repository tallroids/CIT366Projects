import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(0, 'Graduation Application', 'The thing so I can graduate.', 'http://www.google.com', null),    
    new Document(0, 'Academic Transcript', 'The thing that shows I learned stuff.', 'http://www.google.com', null),
    new Document(0, 'Graduation Application', 'The thing so I can graduate.', 'http://www.google.com', null),    
    new Document(0, 'Academic Transcript', 'The thing that shows I learned stuff.', 'http://www.google.com', null),
    new Document(0, 'Graduation Application', 'The thing so I can graduate.', 'http://www.google.com', null),    
    new Document(0, 'Academic Transcript', 'The thing that shows I learned stuff.', 'http://www.google.com', null)
  ]
  constructor() { }

  ngOnInit() {
  }
  
  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document)
  }

}
