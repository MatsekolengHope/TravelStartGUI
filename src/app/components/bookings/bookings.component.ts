import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared-service/book.service';
import { BookFlight } from '../../model-classes/book-flight';
import { Router } from '@angular/router';
import { RouteConfigLoadStart } from '@angular/router';
import { User } from '../../model-classes/user';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  private user: User = JSON.parse(localStorage.getItem('user'));
  private myBookings: BookFlight[];

  constructor(private _router: Router, private _bookService: BookService) { }

  ngOnInit() {
    this._bookService.myBookings(this.user.id).subscribe((myBookings) => {
      this.myBookings = myBookings;
      //localStorage.setItem('myBookings', JSON.stringify(myBookings));
      console.log(this.myBookings);
    }, (error) => {
      console.log(error);
    });
  }

  cancelBooking(book: BookFlight) {
    console.log(book);
    if (confirm('Are you sure you want to cancel this booking? This will be deleted permanatly from the database.')) {
      this._bookService.cancelBooking(book).subscribe((book) => {
      }, (error) => {
        console.log(error);
      });
      //this._router.navigate(['/admin-profile']); 
      window.location.reload();
    }
  }
}
