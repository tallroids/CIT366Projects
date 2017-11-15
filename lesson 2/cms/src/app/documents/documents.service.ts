import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class DocumentsService {
  documents: Document[];
  currentDocument: Document = null;
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  
  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.documents = this.documents.sort(this.compareNames);
    this.currentDocument = this.getDocument('?');
    this.maxDocumentId = this.getMaxId();
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
  
  addDocument(newDocument: Document){
    if(!newDocument){
      return
    }
    
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
  
  updateDocument(originalDocument: Document, newDocument: Document){
    if((!originalDocument) || (!newDocument)){
      return
    }
    
    const pos = this.documents.indexOf(originalDocument)
    if (pos < 0){
      return
    }
    
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone)
  }
  
  deleteDocument(document: Document){
    if (!document) {
      return;
    }
    
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone)
  }
  
  getMaxId():number{
    let maxId = 0;
    this.documents.forEach(function(document){
      const currentId: number = Number(document.id);
      if(currentId > maxId){
        maxId = currentId;
      }
    });
    return maxId;
  }
}
