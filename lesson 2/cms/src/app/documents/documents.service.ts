import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  
  constructor(private http: Http) {
    this.initDocuments();
  }
  
  initDocuments(){
    this.http.get('http://localhost:3000/documents')
      .map(
        (response: Response) => {
          const documents: Document[] = response.json();
          return documents;
        }
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(documents.slice())
        }
      );
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
    
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    
    newDocument.id = '';
    const strDocument = JSON.stringify(newDocument);
    
    this.http.post('http://localhost:3000/documents', strDocument, {headers: headers})
    .map((response: Response) => {
      return response.json()
    })
    .subscribe((documents: Document[]) => {
      this.documents = documents;
      this.documentListChangedEvent.next(this.documents.slice())
    })
  }
  
  updateDocument(originalDocument: Document, newDocument: Document){
    if((!originalDocument) || (!newDocument)){
      return
    }
    
    const pos = this.documents.indexOf(originalDocument)
    if (pos < 0){
      return
    }
    
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    
    const strDocument = JSON.stringify(newDocument);
    
    this.http.patch('http://localhost:3000/documents/' + originalDocument.id, strDocument, {headers: headers})
    .map((response: Response) => {
      return response.json()
    })
    .subscribe((documents: Document[]) => {
      this.documents = documents;
      this.documentListChangedEvent.next(this.documents.slice())
    })
  }
  
  deleteDocument(document: Document){
    if (!document) {
      return;
    }
    
    this.http.delete('http://localhost:3000/documents/' + document.id)
    .map((response: Response) => {
      return response.json()
    })
    .subscribe((documents: Document[]) => {
      this.documents = documents;
      this.documentListChangedEvent.next(this.documents.slice())
    })
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
