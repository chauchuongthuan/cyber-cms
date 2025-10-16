import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from '../modules/post/pages/post.component';
import { SettingComponent } from '../pages/settings/setting/page/setting.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ContactComponent } from '../modules/contact/pages/contact.component';
import { SubscriberComponent } from '../modules/subscriber/pages/subscriber.component';
import { UserComponent } from '../modules/user/pages/user.component';
import { RoleComponent } from '../modules/role/pages/role.component';
import { ActivityComponent } from '../modules/activities/pages/activity.component';
import { PageComponent } from '../modules/pages/pages/page.component';
import { CustomerComponent } from '../modules/customer/pages/customer.component';
import { CustomerCareTypeComponent } from '../modules/customerCareType/pages/customer-care-type.component';
import { CustomerCareListComponent } from '../modules/customerCareList/pages/customer-care-list.component';
import { PagesComponent } from '../modules/token-draw/pages/pages.component';
import { CategoryComponent } from '../modules/category/pages/category.component';
import { ProductComponent } from '../modules/product/pages/product.component';
import { PaymentComponent } from '../modules/payment/pages/payment.component';
import { OrderComponent } from '../modules/orders/pages/order.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'admin',
    component: LayoutsComponent,
    children: [
      {
        path: 'setting',
        component: SettingComponent,
      }, {
        path: 'categories',
        component: CategoryComponent,
      }, {
        path: 'products',
        component: ProductComponent,
      },
      {
        path: 'contacts',
        component: ContactComponent,
      },
      {
        path: 'tickets',
        component: SubscriberComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'roles',
        component: RoleComponent,
      },
      {
        path: 'activities',
        component: ActivityComponent,
      },
      {
        path: 'pages',
        component: PageComponent,
      },
      {
        path: 'posts',
        component: PostComponent,
      },
      {
        path: 'customers',
        component: CustomerComponent,
      },
      {
        path: 'payments',
        component: PaymentComponent,
      },
      {
        path: 'orders',
        component: OrderComponent,
      },
      {
        path: 'feeds',
        component: PostComponent,
      },
    ]
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
