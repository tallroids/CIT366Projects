import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from '../../document.model';
@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  document: Document;
  originalDocument;
  editMode: boolean = true;
  
  constructor(private documentsService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          let id = params['id'];
          if (!id) {
            this.editMode = false;
          } else {
            this.originalDocument = this.documentsService.getDocument(id);
            if (!this.originalDocument) {
              return
              } else {
                this.document = JSON.parse(JSON.stringify(this.originalDocument));
              }
          }
          
        }
      );
  }
  
  onSubmit(form) {
    const values = form.value;
    console.log(values)
    const newDocument = new Document( null, values.documentTitle, values.documentDescription, values.documentUrl, null);
    if (this.editMode) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
      this.router.navigate(['/documents/' + this.originalDocument.id]);
    } else {
      this.documentsService.addDocument(newDocument);
      this.router.navigate(['/documents/' + this.documentsService.getMaxId()]);
    }
  }
  
  onCancel(){
    this.router.navigate(['/documents'])
  }
}
