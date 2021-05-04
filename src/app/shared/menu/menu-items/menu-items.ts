import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'button',
    icon: 'dashboard_customize',
    //children: [
    //  { state: 'view', name: 'View' },
    //  { state: 'add', name: 'Add' },
    //  { state: 'export', name: 'Export' },
    //  { state: 'draftOrders', name: 'Draft Orders' },
    //  //{ state: 'shipments', name: 'Shipments' },
    //  // { state: 'trackingNumbers', name: 'Tracking Numbers' },
    //  //{ state: 'giftCertificates', name: 'Gift Certificates' },
    //  { state: 'orderStatuses', name: 'Order Statuses' },
    //]
  },
  {
    state: 'home/orders',
    name: 'Orders',
    type: 'sub',
    icon: 'shopping_cart',
    children: [
      { state: 'view', name: 'View' },
      { state: 'add', name: 'Add' },
      { state: 'export', name: 'Export' },
      { state: 'draftOrders', name: 'Draft Orders' },
      //{ state: 'shipments', name: 'Shipments' },
     // { state: 'trackingNumbers', name: 'Tracking Numbers' },
      //{ state: 'giftCertificates', name: 'Gift Certificates' },
      { state: 'orderStatuses', name: 'Order Statuses' },
    ]
  },
  {
    state: 'home/products',
    name: 'Products',
    type: 'sub',
    icon: 'explore',
    children: [
      { state: 'view', name: 'View' },
      { state: 'quickAdd', name: 'Quick Add' },
      { state: 'detailedAdd', name: 'Product Detailed Add' },
      { state: 'import', name: 'Import' },
      { state: 'export', name: 'Export' },
      { state: 'productCategories', name: 'Product Categories' },
      { state: 'categoriesSupplier', name: 'Supplier by Categories' },
      //{ state: 'productReviews', name: 'Product Reviews' },
      { state: 'brands', name: 'Brands' },
    ]
  },
  {
    state: 'home/user',
    name: 'User',
    type: 'sub',
    icon: 'import_contacts',
    children: [
      { state: 'customer', name: 'Customer' },
      { state: 'supplier', name: 'Supplier' },
      { state: 'employee', name: 'Employee' }
    ]
  },
  {
    state: 'storefront',
    name: 'Storefront',
    type: 'sub',
    icon: 'view_list',
     children: [
       { state: 'logo', name: 'Logo'},
       { state: 'carousel', name: 'Home Page Carousel' },
       {
         state: 'store', name: 'Store Setup'
       },
       {
         state: 'storeprofile', name: 'Store Profile'
       },
       {
         state: 'currencies', name: 'Currencies'
       }
     ]
  },
  {
    state: 'home/marketting',
    name: 'Marketing',
    type: 'sub',
    icon: 'account_balance_wallet',
    children: [
      {
        state: 'wheel-game', name: 'Wheel Game Setup'
      },
      {
        state: 'affliate', name: 'Affiliate Marketing'
      },
      {
        state: 'couponcode', name: 'Coupon Codes'
      },
      
    ]
  },
  {
    state: 'home/profile',
    name: 'My Profile',
    type: 'sub',
    icon: 'account_balance_wallet',
    children: [
      { state: 'profile', name: 'Edit Profile' },
      { state: 'changeEmail', name: 'Change Email Address' },
      {
        state: 'changepassword', name: 'Change Password'
      },
      { state: 'logout', name: 'Logout' }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})

export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
