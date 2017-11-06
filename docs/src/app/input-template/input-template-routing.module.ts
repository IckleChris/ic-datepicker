import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputTemplateComponent } from './components/input-template/input-template.component';

const routes: Routes = [
  {
    path: '',
    component: InputTemplateComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class InputTemplateRoutingModule { }
