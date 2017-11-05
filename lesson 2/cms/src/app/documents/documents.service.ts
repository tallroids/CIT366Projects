import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable()
export class DocumentsService {
  documents: Document[];
  currentDocument: Document = null;
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  
  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.documents = this.documents.sort(this.compareNames);
    this.currentDocument = this.getDocument('?');
  }

  getDocuments(): Document[]{
    return this.documents.slice();
  }

  compareNames(documentA: Document, documentB: Document){
    if(documentA.name < documentB.name)
      return -1;
    if(documentA.name > documentB.name)
      return 1;
    return 0;
  }

  getDocument(id: string): Document{
    for(let document of this.documents){
      if(document.id === id){
        return document;
      }
    }
  }
  
  deleteDocument(document: Document){
    if (document === null) {
      return;
    }
    
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
