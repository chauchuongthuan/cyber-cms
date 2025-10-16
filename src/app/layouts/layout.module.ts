import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AntdModule } from '../core/antd/ant.module';
import { IconsProviderModule } from '../core/antd/icons-provider.module';
import { CoreModule } from '../core/core.module';
import { LayoutRoutingModule } from './layout.routing';
import { LayoutsComponent } from './layouts/layouts.component';
@NgModule({
    declarations: [
        LayoutsComponent,
    ],
    imports: [
        NzLayoutModule,
        NzMenuModule,
        LayoutRoutingModule,
        AntdModule,
        CommonModule,
        IconsProviderModule,
        CoreModule,
        ReactiveFormsModule
    ],
    exports: [
        LayoutsComponent
    ],
})
export class LayoutModule { }
