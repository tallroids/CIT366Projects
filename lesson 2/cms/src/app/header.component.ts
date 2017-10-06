import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  onNavSelected(feature: string){
    this.featureSelected.emit(feature)
  }
}
