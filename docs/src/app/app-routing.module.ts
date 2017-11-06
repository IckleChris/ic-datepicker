import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: 'app/events/events.module#EventsModule'
  },
  {
    path: 'example',
    loadChildren: 'app/example/example.module#ExampleModule'
  },
  {
    path: 'installation',
    loadChildren: 'app/installation/installation.module#InstallationModule'
  },
  {
    path: 'interfaces',
    loadChildren: 'app/interfaces/interfaces.module#InterfacesModule'
  },
  {
    path: 'options',
    loadChildren: 'app/options/options.module#OptionsModule'
  },
  {
    path: 'theming',
    loadChildren: 'app/theming/theming.module#ThemingModule'
  },
  {
    path: 'input-template',
    loadChildren: 'app/input-template/input-template.module#InputTemplateModule'
  },
  {
    path: '**',
    redirectTo: '/example',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
