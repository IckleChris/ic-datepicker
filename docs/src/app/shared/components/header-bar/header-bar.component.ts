import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  isCollapsed: boolean;
  githubUrl = 'https://github.com/IckleChris/ic-datepicker';
  links = [{
    label: 'Installation',
    routerLink: 'installation'
  }, {
    label: 'Example',
    routerLink: 'example'
  }, {
    label: 'Options',
    routerLink: 'options'
  }, {
    label: 'Interfaces',
    routerLink: 'interfaces'
  }, {
    label: 'Events',
    routerLink: 'events'
  }, {
    label: 'Theming',
    routerLink: 'theming'
  }, {
    label: 'Input Template',
    routerLink: 'input-template'
  }];

  ngOnInit() {
    this.isCollapsed = true;
  }
}
