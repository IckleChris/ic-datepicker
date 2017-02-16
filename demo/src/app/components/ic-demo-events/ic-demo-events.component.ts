import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ic-ic-demo-events',
  templateUrl: './ic-demo-events.component.html',
  styleUrls: ['./ic-demo-events.component.scss']
})
export class IcDemoEventsComponent implements OnInit {
  activeEvent: any;
  markdownPath = 'assets/docs/events/';
  events = [
    { label: 'dateChange' },
    { label: 'monthChange' },
    { label: 'opened' },
    { label: 'closed' }
  ];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let activeEvent;

      if (params['event']) {
        activeEvent = this.events.filter(event => {
          return event.label === params['event'];
        })[0];
      }

      if (!activeEvent) {
        activeEvent = this.events[0];
      }

      this.activeEvent = activeEvent;
    });
  }

  getMarkdownPathByEvent(configOption) {
    return this.markdownPath + `${configOption.label}.md`;
  }
}
