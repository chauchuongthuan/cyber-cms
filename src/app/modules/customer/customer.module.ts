import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CreateEditCustomerComponent } from './components/create-edit-customer/create-edit-customer.component';
import { CustomerComponent } from './pages/customer.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterCustomerComponent } from './components/filter-customer.component/filter-customer.component';

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
    CustomerComponent,
    CreateEditCustomerComponent,
    FilterCustomerComponent,
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class CustomerModule { }
