import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventsRoutingModule } from './events-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MarkdownModule.forRoot(),
    EventsRoutingModule
  ],
  declarations: [EventListComponent]
})
export class EventsModule { }
