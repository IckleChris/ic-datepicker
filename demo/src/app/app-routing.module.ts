import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcDemoEventsComponent } from './components/ic-demo-events/ic-demo-events.component';
import { IcDemoExampleComponent } from './components/ic-demo-example/ic-demo-example.component';
import { IcDemoInstallationComponent } from './components/ic-demo-installation/ic-demo-installation.component';
import { IcDemoOptionsComponent } from './components/ic-demo-options/ic-demo-options.component';
import { IcInterfacesComponent } from './components/ic-interfaces/ic-interfaces.component';

const routes: Routes = [
  { path: '', redirectTo: '/installation', pathMatch: 'full' },
  { path: 'events', component: IcDemoEventsComponent },
  { path: 'events/:event', component: IcDemoEventsComponent },
  { path: 'example', component: IcDemoExampleComponent },
  { path: 'options', component: IcDemoOptionsComponent },
  { path: 'options/:option', component: IcDemoOptionsComponent },
  { path: 'installation', component: IcDemoInstallationComponent },
  { path: 'interfaces', component: IcInterfacesComponent },
  { path: 'interfaces/:interface', component: IcInterfacesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
