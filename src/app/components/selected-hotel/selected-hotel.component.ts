import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../model-classes/hotel';
import { User } from '../../model-classes/user';
import { BookService } from '../../shared-service/book.service';
import { Router } from '@angular/router';
import { BookHotel } from '../../model-classes/book-hotel';

@Component({
  selector: 'app-selected-hotel',
  templateUrl: './selected-hotel.component.html',
  styleUrls: ['./selected-hotel.component.css']
})
export class SelectedHotelComponent implements OnInit {

  private hotelBook: BookHotel = new BookHotel;

  constructor(private _bookService: BookService, private _router: Router) { }

  private selectedHotel: Hotel = JSON.parse(sessionStorage.getItem('selectedHotel'));
  private u: User = JSON.parse(localStorage.getItem('user'));

  private checkInDate: Date = JSON.parse(sessionStorage.getItem('checkInDate'));
  private checkOutDate: Date = JSON.parse(sessionStorage.getItem('checkOutDate'));

  ngOnInit() {
    console.log(this.u);
    console.log(this.selectedHotel);
  }

  onSubmit(data) {

    this.hotelBook.userId = this.u.id;
    this.hotelBook.hotelId = this.selectedHotel.id;
    this.hotelBook.checkOutDate = this.checkOutDate;
    this.hotelBook.checkInDate = this.checkInDate;

    console.log(this.hotelBook.checkOutDate);
    console.log(this.hotelBook.checkInDate);

    this._bookService.createHotelBook(this.hotelBook).subscribe((hotelBook) => {
      this._router.navigate(['/traveller-profile']);
    }, (error) => {
      console.log(error); 
    });
  }
}
