import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { CreateEditPostComponent } from './components/create-edit-post/create-edit-post.component';
import { FilterPostComponent } from './components/filter-post.component/filter-post.component';
import { PostComponent } from './pages/post.component';

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
    PostComponent,
    CreateEditPostComponent,
    FilterPostComponent,
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class PostModule { }
