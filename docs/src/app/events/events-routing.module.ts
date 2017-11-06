import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';

const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: ':option', component: EventListComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class EventsRoutingModule { }
