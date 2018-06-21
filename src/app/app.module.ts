import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './shared-service/user.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { FlightComponent } from './components/flight/flight.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AdminprofileComponent } from './components/adminprofile/adminprofile.component';
import { FlightService } from './shared-service/flight.service';
import { SearchedFlightsComponent } from './components/searched-flights/searched-flights.component';
import { BookComponent } from './components/book/book.component';
import { BookService } from './shared-service/book.service';
import { TabsComponent } from './components/tabs/tabs.component';
import { CarService } from './shared-service/car.service';
import { HotelService } from './shared-service/hotel.service';
import { SearchedCarsComponent } from './components/searched-cars/searched-cars.component';
import { SearchedHotelsComponent } from './components/searched-hotels/searched-hotels.component';
import { HotelAdminProfileComponent } from './components/hotel-admin-profile/hotel-admin-profile.component';
import { CarAdminProfileComponent } from './components/car-admin-profile/car-admin-profile.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { PaymentService } from './shared-service/payment.service';
import { SelectedCarComponent } from './components/selected-car/selected-car.component';
import { SelectedHotelComponent } from './components/selected-hotel/selected-hotel.component';
import { ListflightComponent } from './components/flight/listflight/listflight.component';
import { ListHotelsComponent } from './components/hotel-admin-profile/list-hotels/list-hotels.component';
import { AdditionalTravellersService } from './shared-service/additional-travellers.service';
import { OtherTravelerComponent } from './components/book/other-traveler/other-traveler.component';
import { TravellerAddressService } from './shared-service/traveller-address.service';
import { FlightTicketService } from './shared-service/flight-ticket.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: UserFormComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'user/{id}', component: UserComponent },
  { path: 'selected-flight', component: FlightComponent },
  { path: 'traveller-profile', component: UserprofileComponent },
  { path: 'list-flights', component: ListflightComponent },
  { path: 'admin-profile', component: AdminprofileComponent },
  { path: 'searched-flights', component: SearchedFlightsComponent },
  { path: 'book', component: BookComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'searched-cars', component: SearchedCarsComponent }, 
  { path: 'searched-hotels', component: SearchedHotelsComponent },
  { path: 'car-admin-profile', component: CarAdminProfileComponent },
  { path: 'hotel-admin-profile', component: HotelAdminProfileComponent },
  { path: 'flight-list', component: ListflightComponent } ,
  { path: 'selected-car', component: SelectedCarComponent },
  { path: 'selected-hotel', component: SelectedHotelComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    FlightComponent,
    ListflightComponent,
    UserprofileComponent,
    AdminprofileComponent,
    SearchedFlightsComponent,
    BookComponent,
    TabsComponent,
    SearchedCarsComponent,
    SearchedHotelsComponent,
    HotelAdminProfileComponent,
    CarAdminProfileComponent,
    BookingsComponent,
    SelectedCarComponent,
    SelectedHotelComponent,
    ListHotelsComponent,
    OtherTravelerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, FlightService, BookService, CarService, HotelService, PaymentService, 
    AdditionalTravellersService, TravellerAddressService, FlightTicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
