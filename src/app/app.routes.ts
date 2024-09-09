import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DetailsComponent } from './components/details/details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  //*########## un user
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full', title: 'login'},
      { path: 'login', component: LoginComponent, title: 'Login' },
      {path: 'Forgetpassword', component: ForgetPassComponent, title: 'Forget Password'},
      { path: 'register', component: RegisterComponent, title: 'Register' },
    ],
  },

  //*########### user show
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'Payment' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'category', component: CategoriesComponent, title: 'Category' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'allorders', component: AllOrdersComponent, title: 'All-orders' },
      { path: 'details/:id', component: DetailsComponent, title: 'Details' },
      // { path: 'setting', component: SettingsComponent, title: 'Setting' },
      // { path: 'profile', component: ProfileComponent, title: 'Profile' },
      { path: 'wishlist', component: WishlistComponent, title: 'Wish List' },
    ],
  },

  { path: '**', component: PageNotFoundComponent },
  ];
