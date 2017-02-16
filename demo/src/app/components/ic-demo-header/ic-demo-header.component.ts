import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ic-demo-header',
  templateUrl: './ic-demo-header.component.html',
  styleUrls: ['./ic-demo-header.component.scss']
})
export class IcDemoHeaderComponent {
  githubUrl = 'https://github.com/IckleChris/ic-datepicker';
  navbarLinks = [
    {
      label: 'Installation',
      routerLink: '/installation'
    },
    {
      label: 'Example',
      routerLink: '/example'
    },
    {
      label: 'Options',
      routerLink: '/options'
    },
    {
      label: 'Events',
      routerLink: '/events'
    },
    {
      label: 'Interfaces',
      routerLink: '/interfaces'
    }
  ];
}
