import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service'
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @Input() selectedDocument: Document;
 constructor(private DocumentsService: DocumentsService) { }

  ngOnInit() {
    this.DocumentsService.documentSelectedEvent.subscribe(
    (document: Document) => {this.selectedDocument = document})
  }

  
  
}
