import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../model-classes/hotel';
import { HotelService } from '../../shared-service/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searched-hotels',
  templateUrl: './searched-hotels.component.html',
  styleUrls: ['./searched-hotels.component.css']
})
export class SearchedHotelsComponent implements OnInit {

  constructor(private _hotelService: HotelService, private _router: Router) { }

  private searchedHotels: Hotel[] = JSON.parse(localStorage.getItem('searchedHotels'));
  private selectedHotel: Hotel = new Hotel;
  private checkInDate: Date = new Date;
  private checkOutDate: Date = new Date;

  ngOnInit() {
  }

  searchHotel(hotel) {
    this._hotelService.searchHotels(hotel.location).subscribe((searchedHotels) => {
      this.searchedHotels = searchedHotels;
      localStorage.setItem('searchedHotels', JSON.stringify(this.searchedHotels));
      this._router.navigate(['/searched-hotels']);
      sessionStorage.setItem('checkInDate', JSON.stringify(hotel.checkInDate));
      sessionStorage.setItem('checkOutDate', JSON.stringify(hotel.checkOutDate));
      this.checkInDate = hotel.checkInDate;
      console.log('ChecK in date: '+this.checkInDate);
      console.log(hotel);
    }, (error) => {
      console.log(error);
    });
  }
  
  selectHotel(selectedHotel){
    console.log(selectedHotel);
    this.selectedHotel = selectedHotel;
    sessionStorage.setItem('selectedHotel', JSON.stringify(this.selectedHotel));
    this._router.navigate(['/selected-hotel']);
  }
}
