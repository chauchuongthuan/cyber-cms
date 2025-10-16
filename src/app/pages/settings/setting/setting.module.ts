import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { SettingComponent } from './page/setting.component';
import { SettingService } from './service/setting.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,    
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule,
    CoreModule,
  ],
  declarations: [SettingComponent],
  providers: [SettingService],
  exports: []
})
export class SettingModule { }
