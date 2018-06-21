import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../shared-service/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-admin-profile',
  templateUrl: './hotel-admin-profile.component.html',
  styleUrls: ['./hotel-admin-profile.component.css']
})
export class HotelAdminProfileComponent implements OnInit {

  private HotelsAddition: String;
  private SavedHotels: String;
  private Profile: String;
  

  constructor(private _hotelService: HotelService, private _router: Router) { }

  ngOnInit() {


    if (JSON.parse(sessionStorage.getItem('HotelAdminSelectedTab')) != null) {
      if (JSON.parse(sessionStorage.getItem('HotelAdminSelectedTab')) == 'HotelsAddition') {
        this.HotelsAddition = 'Active';
        this.SavedHotels = null;
        this.Profile = null;
        sessionStorage.setItem('HotelAdminSelectedTab', JSON.stringify('HotelsAddition'));
      }
 
      if (JSON.parse(sessionStorage.getItem('HotelAdminSelectedTab')) == 'SavedHotels') {
        this.HotelsAddition = null;
        this.SavedHotels = 'Active';
        this.Profile = null;
        sessionStorage.setItem('HotelAdminSelectedTab', JSON.stringify('SavedHotels'));
      }

      if (JSON.parse(sessionStorage.getItem('HotelAdminSelectedTab')) == 'Profile') {
        this.HotelsAddition = null;
        this.SavedHotels = null;
        this.Profile = 'Active';
        sessionStorage.setItem('HotelAdminSelectedTab', JSON.stringify('Profile'));
      }
    } else {
      this.HotelsAddition = 'Active';
    }

    console.log(this.HotelsAddition);
  }

  addHotel = function(hotel) {
    this._hotelService.createHotel(hotel).subscribe((hotel) => {
      console.log(hotel);
      alert('hotel details successfully added!');
    }, (error) => {
      console.log(error);
    });
  }

  //Admin tabs contoller function
  tabFunction(event) {

    console.log('Function works!');

    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;


    if ('' + value == 'HotelsAddition') {
      this.HotelsAddition = 'Active';
      this.SavedHotels = null;
      this.Profile = null;
      sessionStorage.setItem('HotelAdminSelectedTab', JSON.stringify('HotelsAddition'));
    }

    if ('' + value == 'SavedHotels') {
      this.HotelsAddition = null;
      this.SavedHotels = 'Active';
      this.Profile = null;
      sessionStorage.setItem('HotelAdminSelectedTab', JSON.stringify('SavedHotels'));
    }

    if ('' + value == 'Profile') {
      this.HotelsAddition = null;
      this.SavedHotels = null;
      this.Profile = 'Active';
      sessionStorage.setItem('HotelAdminSelectedTab', JSON.stringify('Profile'));
    }
  }

  signOut() {
    this._router.navigate(['/sign-in']);
    localStorage.clear();
  }
}
