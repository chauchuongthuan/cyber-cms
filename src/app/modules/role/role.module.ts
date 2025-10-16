import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CreateEditRoleComponent } from './components/create-edit-role/create-edit-role.component';
import { RoleComponent } from './pages/role.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterRoleComponent } from './components/filter-role.component/filter-role.component';
import { PermissionComponent } from './components/permission/permission.component';

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
    RoleComponent,
    CreateEditRoleComponent,
    FilterRoleComponent,
    PermissionComponent,
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class RoleModule { }
