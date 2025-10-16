import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CreateEditCustomerCareListComponent } from './components/create-edit-customer-care-list/create-edit-customer-care-list.component';
import { CustomerCareListComponent } from './pages/customer-care-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterCustomerCareListComponent } from './components/filter-customer-care-list.component/filter-customer-care-list.component';

const IMPORT = [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule,
    CoreModule,
]

const DECLARATIONS = [
    CustomerCareListComponent,
    CreateEditCustomerCareListComponent,
    FilterCustomerCareListComponent,
]

@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class CustomerCareListModule { }
