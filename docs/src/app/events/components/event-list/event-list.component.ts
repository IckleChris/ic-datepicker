import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  activeOption: any;
  markdownPath = 'assets/docs/events/';
  options = [
    { label: 'dateChange' },
    { label: 'monthChange' },
    { label: 'opened' },
    { label: 'closed' }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let activeOption;

      if (params['option']) {
        activeOption = this.options.filter(option => {
          return option.label === params['option'];
        })[0];
      }

      if (!activeOption) {
        activeOption = this.options[0];
      }

      this.activeOption = activeOption;
    });
  }

  onOptionChange(option) {
    this.router.navigate(['/events', option.label]);
  }

  getMarkdownPathByEvent(configOption) {
    return this.markdownPath + `${configOption.label}.md`;
  }
}
