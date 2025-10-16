import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './page/login.component';
import { LoginService } from './services/login.service';

const IMPORT = [
    ReactiveFormsModule,
    FormsModule,
    NzGridModule,
    AntdModule,
    NzButtonModule,
    NzIconModule,
    LoginRoutingModule
]

const DECLARATIONS = [
    LoginComponent
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [LoginService],
    bootstrap: [],
    imports: IMPORT
})
export class LoginModule { }
