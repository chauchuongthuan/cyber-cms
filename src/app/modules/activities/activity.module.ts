import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { FilterActivityComponent } from './components/filter-activity.component/filter-activity.component';
import { ActivityComponent } from './pages/activity.component';

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
    ActivityComponent,
    FilterActivityComponent
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class ActivityModule { }
