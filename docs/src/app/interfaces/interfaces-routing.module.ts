import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfaceListComponent } from './components/interface-list/interface-list.component';

const routes: Routes = [
  { path: '', component: InterfaceListComponent },
  { path: ':option', component: InterfaceListComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class InterfacesRoutingModule { }
