import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

//TODO Inyectar el gifs.service
export class SidebarComponent {
  constructor(private GifsService: GifsService) {}

  get tags():string[] {
    return this.GifsService.tagsHistory;
  }
  searchHistory(tag: string):void {
    this.GifsService.searchTag(tag);
  }





}
