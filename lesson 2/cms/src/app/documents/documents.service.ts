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
    this.http.get('https://cms-f0a74.firebaseio.com/documents.json')
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
    
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
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
    this.storeDocuments();
  }
  
  storeDocuments(){
    const documentString = JSON.stringify(this.documents.slice())
    let headers = new Headers({'Content-type':'application/json'});
    this.http.put('https://cms-f0a74.firebaseio.com/documents.json', documentString, {headers: headers})
      .subscribe(
        ()=>{
          this.documentListChangedEvent.next(this.documents.slice())
        })
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
    this.storeDocuments();
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
