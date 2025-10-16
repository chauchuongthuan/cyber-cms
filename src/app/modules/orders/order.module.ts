import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { CreateEditOrderComponent } from './components/create-edit-order/create-edit-order.component';
import { FilterOrderComponent } from './components/filter-order.component/filter-order.component';
import { OrderComponent } from './pages/order.component';

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
    OrderComponent,
    CreateEditOrderComponent,
    FilterOrderComponent
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class OrderModule { }
