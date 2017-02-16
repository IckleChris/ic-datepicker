import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ic-interfaces',
  templateUrl: './ic-interfaces.component.html',
  styleUrls: ['./ic-interfaces.component.scss']
})
export class IcInterfacesComponent implements OnInit {
  activeOption: any;
  markdownPath = 'assets/docs/interfaces/';
  options = [
    { label: 'IcDatepickerOptionsInterface', key: 'icDatepickerOptions' },
    { label: 'IcCustomDayClass', key: 'icCustomDayClass' },
    { label: 'IcDatepickerDay', key: 'icDatepickerDay' }
  ];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let activeOption;

      if (params['interface']) {
        activeOption = this.options.filter(option => {
          return option.key === params['interface'];
        })[0];
      }

      if (!activeOption) {
        activeOption = this.options[0];
      }

      this.activeOption = activeOption;
    });
  }

  getMarkdownPathByConfigOption(configOption) {
    return this.markdownPath + `${configOption.key}.md`;
  }
}
