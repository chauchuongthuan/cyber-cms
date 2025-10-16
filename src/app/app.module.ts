import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './common/services/api.service';
import { AuthenticationService } from './common/services/auth.service';
import { CommonService } from './common/services/common.service';
import { LocalService } from './common/services/local.service';
import { ToastService } from './common/services/notification.service';
import { RouterService } from './common/services/router.service';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layouts/layout.module';
import { PageModule } from './pages/page.module';
import en from '@angular/common/locales/en';
import { ContactModule } from './modules/contact/contact.module';
import { SubscriberModule } from './modules/subscriber/subscriber.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PostModule } from './modules/post/post.module';
import { ActivityModule } from './modules/activities/activity.module';
import { PageWebModule } from './modules/pages/page.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerCareTypeModule } from './modules/customerCareType/CustomerCareType.module';
import { CustomerCareListModule } from './modules/customerCareList/CustomerCareList.module';
import { TokenDrawModule } from './modules/token-draw/token-draw.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/orders/order.module';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //angular
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    //page module
    CoreModule,
    LayoutModule,
    AppRoutingModule,
    PageModule,

    // News module
    PostModule,

    // Contact module
    ContactModule,

    //Subscriber
    SubscriberModule,

    //User
    UserModule,

    //Role
    RoleModule,

    ActivityModule,
    PageWebModule,

    //Customer
    CustomerModule,

    //CustomerCare
    CustomerCareTypeModule,
    CustomerCareListModule,

    // TokenDraw
    TokenDrawModule,
    //product
    CategoryModule,
    ProductModule,
    //payment
    PaymentModule,
    //order
    OrderModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AuthenticationService, ApiService, CommonService, LocalService, ToastService, RouterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
