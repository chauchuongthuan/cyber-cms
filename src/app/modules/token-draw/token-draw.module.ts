import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { PagesComponent } from './pages/pages.component';
import { ActionTokenDrawComponent } from './components/action-token-draw/action-token-draw.component';
import { FilterTokenDrawComponent } from './components/filter-token-draw/filter-token-draw.component';
import { TokenDrawService } from './services/token-draw.service';
import { ImportDataComponent } from './components/import-data/import-data.component';

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
    PagesComponent,
    ActionTokenDrawComponent,
    FilterTokenDrawComponent,
    ImportDataComponent
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [TokenDrawService],
    bootstrap: [],
    imports: IMPORT
})
export class TokenDrawModule { }
