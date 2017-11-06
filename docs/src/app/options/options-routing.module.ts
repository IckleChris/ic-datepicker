import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsListComponent } from './components/options-list/options-list.component';

const routes: Routes = [
  { path: '', component: OptionsListComponent },
  { path: ':option', component: OptionsListComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class OptionsRoutingModule { }
