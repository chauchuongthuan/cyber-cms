import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';
import { UserComponent } from './pages/user.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterUserComponent } from './components/filter-user.component/filter-user.component';

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
    UserComponent,
    CreateEditUserComponent,
    FilterUserComponent,
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class UserModule { }
