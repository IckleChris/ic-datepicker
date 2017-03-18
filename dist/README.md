# Ic Datepicker

[Docs & Example](https://icklechris.github.io/ic-datepicker)

## Installation

Install the component via NPM;

```
npm install -S ic-datepicker
```

Import the `IcDatepickerModule` into your module;

```typescript
// app.module.ts

import { IcDatepickerModule } from 'ic-datepicker/dist';

@NgModule({
  imports: [
    IcDatepickerModule,
  ],
})
```

## Usage

Use the `<ic-datepicker/>` element, optionally providing an `IcDatepickerOptionsInterface` instance containing overriding options ([see defaults](https://icklechris.github.io/ic-datepicker/options)).

```typescript
import { IcDatepickerOptionsInterface } from 'ic-datepicker/dist';

@Component({
  selector: 'my-example-component',
  template: `
    <form [formGroup]="exampleForm">
      <ic-datepicker formControlName="datepicker" options="datepickerOptions"></ic-datepicker>
    </form>
  `,
  styles: ``
})
export class MyExampleComponent implements OnInit {
  this.datepickerOptions: IcDatepickerOptionsInterface;
  this.exampleForm: FormGroup;
  
  ngOnInit() {
    this.datepickerOptions = {
      position: 'top'
    };
  
    this.exampleForm = new FormGroup({
      datepicker: new FormControl()
    });
  }
}

```
