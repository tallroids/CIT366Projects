import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[];
  
  constructor(private DocumentsService: DocumentsService ) { 
    this.documents = this.DocumentsService.getDocuments()
  }

  ngOnInit() {
  }
  
  onSelectedDocument(document: Document){
    this.DocumentsService.documentSelectedEvent.emit(document)
  }

}
