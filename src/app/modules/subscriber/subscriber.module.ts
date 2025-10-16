import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CreateEditSubscriberComponent } from './components/create-edit-subscriber/create-edit-subscriber.component';
import { SubscriberComponent } from './pages/subscriber.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterSubscriberComponent } from './components/filter-subscriber.component/filter-subscriber.component';

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
    SubscriberComponent,
    CreateEditSubscriberComponent,
    FilterSubscriberComponent,
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class SubscriberModule { }
