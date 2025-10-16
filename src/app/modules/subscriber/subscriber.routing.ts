import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriberComponent } from './pages/subscriber.component';

const routes: Routes = [
  { path: '', component: SubscriberComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriberRoutingModule { }
