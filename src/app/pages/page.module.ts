import { NgModule } from '@angular/core';
import { ApiService } from '../common/services/api.service';
import { LoginModule } from './login/login.module';
import { SettingModule } from './settings/setting/setting.module';
import { WelcomeModule } from './welcome/welcome.module';
@NgModule({
    declarations: [ ],
    imports: [
        LoginModule,
        SettingModule,
        WelcomeModule
    ],
    exports: [],
    providers: []
})
export class PageModule { }
