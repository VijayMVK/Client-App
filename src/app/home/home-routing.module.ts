import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users/users.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserManageListComponent } from './user-management/user-manage-list/user-manage-list.component';
import { UserLogoutComponent } from './user-management/user-logout/user-logout.component';
import { OrdersComponent } from './orders/orders.component';
import { AddProductComponent } from './products/addproduct/addproduct.component';
import { BrandsComponent } from './products/brands/brands.component';
import { ExportProductComponent } from './products/export-product/export-product.component';
import { ImportProductComponent } from './products/import-product/import-product.component';
import { ProductCategoriesComponent } from './products/product-categories/product-categories.component';
import { ProductReviewComponent } from './products/product-review/product-review.component';
import { ProductsComponent } from './products/products.component';
import { ViewComponent } from './products/view/view.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { ExportOrdersComponent } from './orders/export-orders/export-orders.component';
import { GiftCertificatesComponent } from './orders/gift-certificates/gift-certificates.component';
import { OrderStatusComponent } from './orders/order-status/order-status.component';
import { TrackingNumbersComponent } from './orders/tracking-numbers/tracking-numbers.component';
import { ViewOrdersComponent } from './orders/view-orders/view-orders.component';
import { DraftOrdersComponent } from './orders/draft-orders/draft-orders.component';
import { AddProductDetailsComponent } from './products/add-product-details/add-product-details.component';
import { CategoriesSupplierComponent } from './products/categories-supplier/categories-supplier.component';
import { MarkettingComponent } from './marketting/marketting.component';
import { BannersComponent } from './marketting/banners/banners.component';
import { CouponcodeComponent } from './marketting/couponcode/couponcode.component';
import { WheelGameComponent } from './marketting/wheel-game/wheel-game.component';
import { SupplierListComponent } from './users/supplier-list/supplier-list.component';
import { CustomerListComponent } from './users/customer-list/customer-list.component';
import { EmployeeListComponent } from './users/employee-list/employee-list.component';
import { SupplierDetailComponent } from './users/supplier-list/supplier-detail/supplier-detail.component';
import { CustomerDetailComponent } from './users/customer-list/customer-detail/customer-detail.component';
import { EmployeeDetailComponent } from './users/employee-list/employee-detail/employee-detail.component';
import { WheelGameDetailComponent } from './marketting/wheel-game-detail/wheel-game-detail.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'products', component: ProductsComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full'
          },
          {
            path: 'view', component: ViewComponent,
          },
          {
            path: 'quickAdd', component: AddProductComponent,
          },
          {
            path: 'detailedAdd', component: AddProductDetailsComponent,
          },

          {
            path: 'import', component: ImportProductComponent,
          },
          {
            path: 'export', component: ExportProductComponent,
          },
          {
            path: 'productCategories', component: ProductCategoriesComponent,
          },
          {
            path: 'categoriesSupplier', component: CategoriesSupplierComponent,
          },
          {
            path: 'productReviews', component: ProductReviewComponent,
          },
          {
            path: 'brands', component: BrandsComponent,
          },
          { path: 'addProduct', component: AddProductDetailsComponent, }
        ]
      },
      {
        path: 'orders', component: OrdersComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full'
          },
          {
            path: 'view', component: ViewOrdersComponent,
            children: [
              {
                path: 'order-detail',
                component: OrderDetailComponent
              }
            ]
          },
          {
            path: 'add', component: AddOrderComponent,
          },
          {
            path: 'export', component: ExportOrdersComponent,
          },
          {
            path: 'draftOrders', component: DraftOrdersComponent,
          },
          {
            path: 'trackingNumbers', component: TrackingNumbersComponent,
          },
          {
            path: 'giftCertificates', component: GiftCertificatesComponent,
          },
          {
            path: 'orderStatuses', component: OrderStatusComponent,
          }
        ]
      },
      {
        path: 'user', component: UsersComponent,
        children: [
          {
            path: '',
            redirectTo: 'customer',
            pathMatch: 'full'
          },
          {
            path: 'supplier',
            component: SupplierListComponent,
            children: [
              {
                path: 'supplier-detail',
                component: SupplierDetailComponent
              }
            ]
          },
          {
            path: 'customer',
            component: CustomerListComponent,
            children: [
              {
                path: 'customer-detail',
                component: CustomerDetailComponent
              }
            ]
          },
          {
            path: 'employee',
            component: EmployeeListComponent,
            children: [
              {
                path: 'employee-detail',
                component: EmployeeDetailComponent
              }
            ]
          }
        ]
      },
      {
        path: 'marketting', component: MarkettingComponent,
        children: [
          {
            path: '',
            redirectTo: 'wheel-game',
            pathMatch: 'full'
          },
          {
            path: 'wheel-game',
            component: WheelGameComponent,
            children: [
              {
                path: 'wheel-game-detail',
                component: WheelGameDetailComponent
              }
            ]
          },
          {
            path: 'banners',
            component: BannersComponent
          },
          {
            path: 'couponcode',
            component: CouponcodeComponent
          }
        ]
      },
      {
        path: 'profile', component: UserManagementComponent,
        children: [
          {
            path: 'profile',
            component: UserManageListComponent
          },
          {
            path: 'logout',
            component: UserLogoutComponent
          }
        ]
      },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
