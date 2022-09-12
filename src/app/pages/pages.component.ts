import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { DimensionsService } from '../shared/services/dimentions.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" autoCollapse="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements AfterViewInit {
  constructor(
    private dimensionsService: DimensionsService,
    private cdr: ChangeDetectorRef
  ) { }
  menu = MENU_ITEMS;

  ngAfterViewInit() {
    this.dimensionsService.getDimensions();
    this.cdr.detectChanges();
  }
}
