import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { CreateEditProductComponent } from './components/create-edit-product/create-edit-product.component';
import { FilterProductComponent } from './components/filter-product.component/filter-product.component';
import { SectionProductComponent } from './components/section-content/section-product.component';
import { ProductComponent } from './pages/product.component';

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
    ProductComponent,
    CreateEditProductComponent,
    FilterProductComponent,
    SectionProductComponent
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class ProductModule { }
