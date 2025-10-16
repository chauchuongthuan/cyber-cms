import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts/layouts.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/layout.module').then(m => m.LayoutModule)
},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
