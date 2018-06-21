import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BookFlight } from '../model-classes/book-flight';
import { CarBook } from '../model-classes/car-book';
import { BookHotel } from '../model-classes/book-hotel';
import { Email } from '../class/email';

@Injectable()
export class BookService {

  private baseUrl: string = 'http://localhost:8080/flight-book';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  createFlightBook(bookFlight: BookFlight) {
    return this._http.post(this.baseUrl + '/book-flight', JSON.stringify(bookFlight), this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  createCarBook(carbook: CarBook) {
    return this._http.post(this.baseUrl + '/book-car', JSON.stringify(carbook), this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  createHotelBook(hotelBook: BookHotel) {
    return this._http.post(this.baseUrl + '/book-hotel', JSON.stringify(hotelBook), this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  }

  myBookings(travellerId: number) {
    return this._http.get(this.baseUrl + '/find-flight-bookings/' + travellerId, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  cancelBooking(book: BookFlight) {
    return this._http.get(this.baseUrl + '/delete/' + book.id, JSON.stringify(book)).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getFlightSeat(flightId: number) {
    return this._http.get(this.baseUrl + '/seat/' + flightId, JSON.stringify(flightId)).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  specificFlightBooks(flightId: number) {
    return this._http.get(this.baseUrl + '/specific-flight-books/' + flightId, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  travellersSeatBooked(flightId: number) {
    return this._http.get(this.baseUrl + '/seat-booked-users/' + flightId, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  sendEmail(email: Email) {
    return this._http.request('http://localhost:8080/book/send-email/'+email.to+'/'+email.subject+'/'+email.body, JSON.stringify(email)).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
} 
