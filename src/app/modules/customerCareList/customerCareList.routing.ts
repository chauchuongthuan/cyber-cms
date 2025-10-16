import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCareListComponent } from './pages/customer-care-list.component';

const routes: Routes = [
  { path: '', component: CustomerCareListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerCareListRoutingModule { }
