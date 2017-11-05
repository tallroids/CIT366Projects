import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  selectedDocument: Document;
  id: string;
  nativeWindow: any;

  constructor(private DocumentsService: DocumentsService,
               private router: Router, 
               private route: ActivatedRoute, 
               private windRef: WindRefService) {
    this.nativeWindow = windRef.getNativeWindow();
  }
  
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.selectedDocument = this.DocumentsService.getDocument(this.id);
        }
      );
  }

  onView(){
    if (this.selectedDocument.url){
      this.nativeWindow.open(this.selectedDocument.url)
    }
  }
  
  onDelete(){
    this.DocumentsService.deleteDocument(this.selectedDocument);
    this.router.navigate(['/documents'])
  }
}
