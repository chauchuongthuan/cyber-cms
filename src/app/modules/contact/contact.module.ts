import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CreateEditContactComponent } from './components/create-edit-contact/create-edit-contact.component';
import { ContactComponent } from './pages/contact.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterContactComponent } from './components/filter-contact.component/filter-contact.component';

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
    ContactComponent,
    CreateEditContactComponent,
    FilterContactComponent,
]

@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class ContactModule { }
