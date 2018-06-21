import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../model-classes/hotel';
import { HotelService } from '../../../shared-service/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.css']
})
export class ListHotelsComponent implements OnInit {

  private hotels: Hotel[];
  private Hotelsupdate: String = null;
  private hotel: Hotel = new Hotel;

  constructor(private _hotelService: HotelService, private _router: Router) { }

  ngOnInit() {
    this.listFlights();
  }


  listFlights() {
    this._hotelService.listHotels().subscribe((hotels) => {
      this.hotels = hotels;
      console.log(this.hotels);
    }, (error) => {
      console.log(error);
    });
  }

  delete(hotel: Hotel) {
    if (confirm('Are you sure you want to delete the record fron the database?') == true) {
      this._hotelService.deleteHotel(hotel).subscribe((hotel) => {
        alert('Record has successfully been deleted from the database.');
      }, (error) => {
        console.log(error);
      });

      /*this._bookService.myBookings(this.user.id).subscribe((myBookings) => {
        this.myBookings = myBookings;
        //localStorage.setItem('myBookings', JSON.stringify(myBookings));
      }, (error) => {
        console.log(error);
      });*/
      //this._router.navigate(['/hotel-admin-profile']);
    }
    //window.location.reload();
  }

  update(hotel: Hotel) {
    console.log('Update method works!');
    console.log(hotel);
    this._hotelService.deleteHotel(hotel);
    this.Hotelsupdate = "Show Form";
    this.hotel = hotel;
  }

  viewBookings(hotel: Hotel) {
    sessionStorage.setItem('FlightsAdminSelectedTab', JSON.stringify('Bookings'));

    //window.location.reload();

    /*return this._hotelService.specificHotelBooks(hotel.id).subscribe((specificHotelBooks) => {
      this.specificHotelBooks = specificHotelBooks;
      console.log(hotel.id);
      sessionStorage.setItem(JSON.stringify('specificHotelBooks'), specificHotelBooks);
    }, (error) => {
      console.log(error);
    });*/

  }

  addHotel = function(hotel) {
    this._hotelService.createHotel(hotel).subscribe((hotel) => {
      console.log(hotel);
      alert('hotel details successfully added!');
    }, (error) => {
      console.log(error);
    });
    this.Hotelsupdate = null;
  }

  cancel(){
    this.Hotelsupdate = null;
  }
}
