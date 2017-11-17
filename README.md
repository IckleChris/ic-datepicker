# Ic Datepicker

[Docs & Example](https://icklechris.github.io/ic-datepicker)

**Warning:** This component is still in pre-release. Although the component should be stable, until v1 is released there is potential for API changes whilst things are finalised. To prevent issues, ensure your `package.json` file specifies a specific version (e.g. `"ic-datepicker": "0.0.5"`).

## Installation

Install the component via NPM;

```
npm install -S ic-datepicker
  (or)
yarn add ic-datepicker
```

Import the `IcDatepickerModule` into your module;

```typescript
// app.module.ts

import { IcDatepickerModule } from 'ic-datepicker';

@NgModule({
  imports: [
    IcDatepickerModule,
  ],
})
```

## Usage

Use the `<ic-datepicker/>` element, optionally providing an `IcDatepickerOptionsInterface` instance containing overriding options ([see defaults](https://icklechris.github.io/ic-datepicker/options)).

```typescript
import { IcDatepickerOptionsInterface } from 'ic-datepicker';

@Component({
  selector: 'my-example-component',
  template: `
    <form [formGroup]="exampleForm">
      <!-- Reactive Form -->
      <ic-datepicker formControlName="datepicker" options="datepickerOptions"></ic-datepicker>
      
      <!-- ngModel -->
      <ic-datepicker [(ngModel)]="modelDatepicker" options="datepickerOptions"></ic-datepicker>
    </form>
  `,
  styles: ``
})
export class MyExampleComponent implements OnInit {
  datepickerOptions: IcDatepickerOptionsInterface;
  exampleForm: FormGroup;
  modelDatepicker: any;

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
