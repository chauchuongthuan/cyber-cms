import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CreateEditCustomerCareTypeComponent } from './components/create-edit-customer-care-type/create-edit-customer-care-type.component';
import { CustomerCareTypeComponent } from './pages/customer-care-type.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterCustomerCareTypeComponent } from './components/filter-customer-care-type.component/filter-customer-care-type.component';

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
    CustomerCareTypeComponent,
    CreateEditCustomerCareTypeComponent,
    FilterCustomerCareTypeComponent,
]

@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class CustomerCareTypeModule { }
