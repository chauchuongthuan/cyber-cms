import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCareTypeComponent } from './pages/customer-care-type.component';

const routes: Routes = [
  { path: '', component: CustomerCareTypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerCareTypeRoutingModule { }
