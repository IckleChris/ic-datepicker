import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventsModule } from './events/events.module';
import { ExampleModule } from './example/example.module';
import { InstallationModule } from './installation/installation.module';
import { OptionsModule } from './options/options.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    EventsModule,
    ExampleModule,
    InstallationModule,
    OptionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
