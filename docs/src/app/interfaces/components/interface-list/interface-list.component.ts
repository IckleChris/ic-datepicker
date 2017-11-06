import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-interface-list',
  templateUrl: './interface-list.component.html',
  styleUrls: ['./interface-list.component.scss']
})
export class InterfaceListComponent implements OnInit {
  activeOption: any;
  markdownPath = 'assets/docs/interfaces/';
  options = [
    { label: 'IcDatepickerOptionsInterface', key: 'icDatepickerOptions' },
    { label: 'IcCustomDayClass', key: 'icCustomDayClass' },
    { label: 'IcDatepickerDay', key: 'icDatepickerDay' }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let activeOption;

      if (params['option']) {
        activeOption = this.options.filter(option => {
          return option.key === params['option'];
        })[0];
      }

      if (!activeOption) {
        activeOption = this.options[0];
      }

      this.activeOption = activeOption;
    });
  }

  onOptionChange(option) {
    this.router.navigate(['/interfaces', option.label]);
  }

  getMarkdownPathByConfigOption(configOption) {
    return this.markdownPath + `${configOption.key}.md`;
  }
}
