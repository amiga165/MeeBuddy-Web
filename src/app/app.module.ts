
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // this is needed!
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxIziToastModule } from 'ngx-izitoast';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

 
import { ServiceNavbarComponent } from "./components/navbar/";
import { FooterComponent } from "./components/footer/footer.component";

import { CircleComponent } from './components/circle/circle.component';
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component';
import { TextbarComponent } from './components/textbar/textbar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { Page500Component } from './pages/page500/page500.component';
import { Page404Component } from './pages/page404/page404.component';


import {
	IndexComponent,
	ServicesComponent,
	AboutusComponent,
	JoinusComponent,
	ContactusComponent,
	SliderComponent
  } from "./pages/landing/sections/";
  

import { HomeComponent } from "./pages/home/home.component";
import { OrdersComponent } from './pages/orders/orders.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { RestaurantItemsComponent } from './pages/restaurants/restaurant-items/restaurant-items.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AddressComponent } from './pages/address/address.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { PaymethodComponent } from './pages/paymethod/paymethod.component';
import { ShopItemsComponent } from './pages/shopping/shop-items/shop-items.component';
import { ShopsComponent } from './pages/shopping/shops/shops.component';
import { SellproductComponent } from './pages/sellproduct/sellproduct.component';
import { LoginmodalComponent } from './modals/loginmodal/loginmodal.component';
import { UpdateAddressModalComponent } from './modals/update-address-modal/update-address-modal.component'
import { LocationmodalComponent } from './modals/locationmodal/locationmodal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ServicepageComponent } from './pages/servicepage/servicepage.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { AddressformComponent } from './modals/addressform/addressform.component';
import { FloatappComponent } from './components/floatapp/floatapp.component';
import { SearchComponent } from './pages/search/search.component';
import { VerifyotpComponent } from './modals/verifyotp/verifyotp.component';
import { ProfileformComponent } from './modals/profileform/profileform.component';
import { APIService } from "./_services/api.service";
import { LocationService } from "./_services/location.service";
import { AuthService } from "./_services/auth.service";
import { UserService } from "./_services/user.service";
import { CommonService } from "./_services/common.service";
import { LoadingComponent } from './pages/loading/loading.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CenterService } from "./_services/center.service";
import { HelperPipe, SplitPipe } from "./_helpers/help.pipe";
import { LocalproductsComponent } from './pages/localproducts/localproducts.component';
import { FoodItemComponent } from './pages/food-item/food-item.component';
import { AddressCardComponent } from './pages/address-card/address-card.component';
import { LocalproductItemsComponent } from './pages/localproducts/localproduct-items/localproduct-items.component';
import { CartbuttonComponent } from './pages/cartbutton/cartbutton.component';
import { SearchItemComponent } from './pages/search-item/search-item.component';
import { LogoLoadComponent } from './components/logo-load/logo-load.component';
import { RatingComponent } from './components/rating/rating.component';
import { OrderAnyitemComponent } from './pages/order-anyitem/order-anyitem.component';
import { OrderCardComponent } from './pages/order-card/order-card.component';

import { AddressSelectComponent } from './components/address-select/address-select.component';
import { ServiceFormComponent } from './pages/service-form/service-form.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { StickyButtonComponent } from './components/sticky-button/sticky-button.component';
import { ImagePopupComponent } from './components/image-popup/image-popup.component';
import { ImageModalComponent } from './modals/image-modal/image-modal.component';
import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { FilterMobileComponent } from './components/filter-mobile/filter-mobile.component';
import { SupermenuComponent } from './components/supermenu/supermenu.component';
import { ShopCardComponent } from './pages/shop-card/shop-card.component';
import { ImageOrderComponent } from './pages/image-order/image-order.component';
import { DonateComponent } from './pages/donate/donate.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { ServiceOrderComponent } from './modals/service-order/service-order.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ItemLinkComponent } from './components/item-link/item-link.component';
// import { LocalProdBuyComponent } from './pages/local-prod-buy/local-prod-buy.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CircleComponent,
    TextbarComponent,
    LandingComponent,
    Page500Component,
    Page404Component,
    IndexComponent,
    ServicesComponent,
    JoinusComponent,
    ContactusComponent,
    AboutusComponent, 
    OrdersComponent, RestaurantsComponent , ServiceNavbarComponent, RestaurantItemsComponent, ShoppingComponent, ProfileComponent, WishlistComponent, AddressComponent, WalletComponent, 
    PaymentComponent, SummaryComponent, ShippingComponent, PaymethodComponent, ShopItemsComponent, ShopsComponent, SellproductComponent, LoginmodalComponent, UpdateAddressModalComponent, LocationmodalComponent, NotificationComponent,
    ServicepageComponent,
    MyprofileComponent,
    AddressformComponent,
    FloatappComponent,
    SearchComponent,
    VerifyotpComponent,
    ProfileformComponent,
    LoadingComponent,
    LogoutComponent,
    HelperPipe, SplitPipe,
    LocalproductsComponent,
    FoodItemComponent,
    AddressCardComponent,
    LocalproductItemsComponent,
    CartbuttonComponent,
    SearchItemComponent,
    LogoLoadComponent,
    RatingComponent,
    OrderAnyitemComponent,
    OrderCardComponent,
    AddressSelectComponent,
    ServiceFormComponent,
    MobileMenuComponent,
    StickyButtonComponent,
    ImagePopupComponent,
    ImageModalComponent,
    NotificationPageComponent,
    FilterMobileComponent,
    SupermenuComponent,
    ShopCardComponent,
    ImageOrderComponent,
    DonateComponent,
    BreadcrumbComponent,
    SliderComponent,
    OrderSummaryComponent,
    ServiceOrderComponent,
    SearchBarComponent,
    ItemLinkComponent,
    HomeComponent,
    SuccessStoriesComponent
 ],
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),  
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    AutocompleteLibModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgxIziToastModule,
    HttpClientModule,
    NgxSkeletonLoaderModule.forRoot(),
    SlickCarouselModule,
    InfiniteScrollModule
  ],
  providers: [ APIService, LocationService, AuthService, UserService, CommonService, CenterService, HelperPipe, SplitPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
