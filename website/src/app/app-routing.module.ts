// Angular Core 
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { LandingComponent } from "./pages/landing/landing.component";
import { Page404Component } from "./pages/page404/page404.component";
import { Page500Component } from "./pages/page500/page500.component";
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from "./pages/orders/orders.component";
import { RestaurantItemsComponent } from "./pages/restaurants/restaurant-items/restaurant-items.component"
import { ProfileComponent } from "./pages/profile/profile.component"
import { PaymentComponent } from "./pages/payment/payment.component";
import { ShoppingComponent } from "./pages/shopping/shopping.component";
import { ShopsComponent } from "./pages/shopping/shops/shops.component";
import { SellproductComponent } from "./pages/sellproduct/sellproduct.component";
import { ImagePopupComponent } from "./components/image-popup/image-popup.component";
import { ServicepageComponent } from "./pages/servicepage/servicepage.component";
import { SearchComponent } from "./pages/search/search.component";
import { AuthGuard } from './_helpers/auth.guard';
import { CenterGuard } from "./_helpers/center.guard";
import { LogoutComponent } from "./pages/logout/logout.component";
import { LocalproductsComponent } from "./pages/localproducts/localproducts.component";
// import { LocalproductItemsComponent } from './pages/localproducts/localproduct-items/localproduct-items.component';
import { AddressSelectComponent } from "./components/address-select/address-select.component";
import { OrderAnyitemComponent } from "./pages/order-anyitem/order-anyitem.component";
import { ServiceFormComponent } from "./pages/service-form/service-form.component";
import { NotificationPageComponent } from "./pages/notification-page/notification-page.component";
import { ImageOrderComponent } from "./pages/image-order/image-order.component";
import { DonateComponent } from "./pages/donate/donate.component";
import { OrderSummaryComponent } from "./pages/order-summary/order-summary.component";
import { ItemLinkComponent } from './components/item-link/item-link.component';
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component';

// Routes
const routes: Routes = [
  { path:"", component: LandingComponent },
  { path: "home", canActivate: [CenterGuard], component: HomeComponent },
  { path: "orders", canActivate: [AuthGuard], component: OrdersComponent },
  { path: "error", component: Page500Component },
  { path: "restaurants", canActivate: [CenterGuard], component: ShoppingComponent },
  { path:"restaurants/:name", canActivate: [CenterGuard], component: RestaurantItemsComponent },
  { path: "profile", canActivate: [AuthGuard], component: ProfileComponent },
  { path: "cart", component: PaymentComponent },
  { path: "stories", component: SuccessStoriesComponent },
  { path: "shopping", canActivate: [CenterGuard], component: ShoppingComponent },
  { path: "shopping/:center-name/:url-name", component: ShopsComponent },
  { path: "shop/:center-name/:url-name", component: RestaurantItemsComponent },
  { path: "sell", canActivate: [AuthGuard], component: SellproductComponent },
  { path: "services", canActivate: [CenterGuard], component: ServicepageComponent },
  { path: "services/:name", canActivate: [CenterGuard], component: ServiceFormComponent },
  { path: "search", canActivate: [CenterGuard], component: SearchComponent },
  { path: "logout", canActivate: [AuthGuard], component: LogoutComponent },
  { path: "local-product", canActivate: [CenterGuard], component: LocalproductsComponent },
  // { path: "local-product/:name", canActivate: [CenterGuard], component: LocalproductItemsComponent },
  { path: "rating", canActivate: [AuthGuard], component: AddressSelectComponent },
  { path: "anyItem", canActivate: [AuthGuard], component: OrderAnyitemComponent },
  { path: "popup", canActivate: [CenterGuard],component: ImagePopupComponent },
  { path: "notifications", component: NotificationPageComponent },
  { path: "image-order", canActivate: [AuthGuard], component : ImageOrderComponent },
  { path: "donate", canActivate: [AuthGuard], component: DonateComponent },
  { path: "track/:id",canActivate: [AuthGuard], component: OrderSummaryComponent },
  { path: "shop/:center/:category", component: ItemLinkComponent },
  { path: "**", component: Page404Component}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
