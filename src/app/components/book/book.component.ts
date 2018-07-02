import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../shared-service/book.service';
import { Payment } from '../../model-classes/payment';
import { BookFlight } from '../../model-classes/book-flight';
import { Flight } from '../../model-classes/flight';
import { User } from '../../model-classes/user';
import { PaymentService } from '../../shared-service/payment.service';
import { AdditionalTravellers } from '../../model-classes/additional-travellers';
import { AdditionalTravellersService } from '../../shared-service/additional-travellers.service';
import { NgForm } from '@angular/forms';

import * as jsPDF from 'jspdf';
import { Email } from '../../class/email';
import { FlightTicket } from '../../model-classes/flight-ticket';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private u: User = JSON.parse(localStorage.getItem('user'));
  private selectedFlight: Flight = JSON.parse(localStorage.getItem('selectedFlight'));
  private flightTicket: FlightTicket = new FlightTicket();

  private loop: number = JSON.parse(sessionStorage.getItem('loop'));
  private form: number = JSON.parse(sessionStorage.getItem('form'));

  private additionalTraveller: AdditionalTravellers = new AdditionalTravellers;
  private additionalTravellers: AdditionalTravellers[] = [];
  private travellers: AdditionalTravellers[] = [];

  private seat: number = -1;

  private email: Email = new Email;
  private bodyMessage: String = 'Hello ';

  private payment: Payment = new Payment;
  private cost: number;
  private totalAmount: number;

  private noOfChildren: number = JSON.parse(sessionStorage.getItem('noOfChildren'));
  private noOfAdults: number = JSON.parse(sessionStorage.getItem('noOfAdults'));

  constructor(private _bookService: BookService, private _router: Router, private _paymentService: PaymentService,
    private _additionalTravellerService: AdditionalTravellersService) { }

  ngOnInit() {

    this._bookService.getFlightSeat(this.selectedFlight.id).subscribe((seat) => {
      this.seat = seat;
    }, (error) => {
      console.log(error);
    });

    this.getFlightSeat(this.selectedFlight.id);

    this.cost = this.selectedFlight.fareAdult;
    this.totalAmount = this.cost;

    this.bodyMessage += this.u.firstname+',$$'+
    'This are all your travel details for you and all your traveler mates$$'+
    'Title: ' + this.u.title + '$' +
    'Traveller name: ' + this.u.firstname + '$' +
    'Traveller surname: ' + this.u.lastname + '$' +
    'Flight Name: ' + this.selectedFlight.name + '$' +
    'Seat booked: ' + this.seat + '$' +
    'From: ' + this.selectedFlight.departurecity + '$' +
    'To: ' + this.selectedFlight.arrivalcity + '$' +
    'Date of deparure:' + this.selectedFlight.departuredate + '$' +
    'Time of deparure: ' + this.selectedFlight.departuretime + '$' +
    'Time of arrival: ' + this.selectedFlight.arrivaltime + '$'+
    '$';
  }

  onSubmit(payment: Payment) {

    //Payment user details
    this.payment.userId = this.u.id;
    this.payment.accountHolder = this.u.firstname + ' ' + this.u.lastname;
    this.payment.cardNumber = payment.cardNumber;
    this.payment.expiryDate = payment.expiryDate;
    this.payment.totalAmount = this.totalAmount;
    this.payment.pin = payment.pin;

    this.flightTicket.flightId = this.selectedFlight.id;
    this.flightTicket.flightName = this.selectedFlight.name;
    this.flightTicket.seat = this.seat;
    this.flightTicket.travellerName = this.u.firstname;
    this.flightTicket.travellerSurname = this.u.lastname;
    this.flightTicket.departureCity = this.selectedFlight.departurecity;
    this.flightTicket.arrivalCity = this.selectedFlight.arrivalcity;
    this.flightTicket.arrivalTime = this.selectedFlight.arrivaltime;
    this.flightTicket.departureTime = this.selectedFlight.departuretime;
    this.flightTicket.departureDate = this.selectedFlight.departuredate;
    this.flightTicket.arrivalTime = this.selectedFlight.arrivaltime;
    this.flightTicket.travellerId = this.u.id;

    console.log('Next Seat: ' + this.flightTicket.seat);

    this._paymentService.createPayment(this.payment).subscribe((payment) => {
    }, (error) => {
      console.log(error);
    });

    this._bookService.createFlightTicket(this.flightTicket).subscribe((flightTicket) => {
    }, (error) => {
      console.log(error);
    });

    this.bodyMessage +=
      'Total amount R: ' + this.totalAmount + '$$'+
      
      'Thanks for choosing Travelstart, have a nice and a safe trip, we hope to hear from you again.$$'+
      
      'Kind regards,$'+
      
      'Travelstart Team$'+
      'Email: admin@travelstart.co.za$'+
      'Tel: 011 123 4567$'+
      'Fax: 011 123 4568$';

    this.sendEmail(this.email);

    console.log(this.bodyMessage);

    //this._router.navigate(['/traveller-profile']);
  }



  getFlightSeat(flightId: number) {
    return this._bookService.getFlightSeat(flightId).subscribe((seat) => {
      this.seat = seat;
    }, (error) => {
      console.log(error);
    });
  }

  saveAddtionalTraveller(traveller) {

    //Set attributes
    traveller.userId = this.u.id;
    traveller.seat = this.seat + 1;
    traveller.surname = traveller.surname;
    traveller.name = traveller.name;

    this._additionalTravellerService.createTraveller(traveller).subscribe((traveller) => {
    }, (error) => {
      console.log(error);
    });

    this.flightTicket.flightId = this.selectedFlight.id;
    this.flightTicket.flightName = this.selectedFlight.name;
    this.flightTicket.seat = this.seat;
    this.flightTicket.travellerName = this.u.firstname;
    this.flightTicket.travellerSurname = this.u.lastname;
    this.flightTicket.departureCity = this.selectedFlight.departurecity;
    this.flightTicket.arrivalCity = this.selectedFlight.arrivalcity;
    this.flightTicket.arrivalTime = this.selectedFlight.arrivaltime;
    this.flightTicket.departureTime = this.selectedFlight.departuretime;
    this.flightTicket.departureDate = this.selectedFlight.departuredate;
    this.flightTicket.arrivalTime = this.selectedFlight.arrivaltime;
    this.flightTicket.travellerId = this.u.id;

    if (traveller.age < 12) {
      this.totalAmount = this.totalAmount + this.selectedFlight.fareChild;
    } else {
      this.totalAmount = this.totalAmount + this.selectedFlight.fareAdult;
    }

    sessionStorage.setItem('loop', JSON.stringify(this.loop - 1));
    sessionStorage.setItem('form', JSON.stringify(this.form + 1));

    this.additionalTraveller = traveller;

    this.additionalTravellers.push(this.additionalTraveller);
    console.log(this.loop);
    console.log(this.flightTicket);

    console.log('Length: ' + this.additionalTravellers.length);

    this.form = this.additionalTravellers.length;

    sessionStorage.setItem('additionalTravellers', JSON.stringify(this.additionalTravellers));
    console.log(this.additionalTravellers);

    this.bodyMessage += 'Title: ' + this.additionalTraveller.title + '$' +
    'Traveller name: ' + this.additionalTraveller.name + '$' +
    'Traveller surname: ' + this.additionalTraveller.surname + '$' +
    'Flight Name: ' + this.selectedFlight.name + '$' +
    'Seat booked: ' + this.seat + '$' +
    'From: ' + this.selectedFlight.departurecity + '$' +
    'To: ' + this.selectedFlight.arrivalcity + '$' +
    'Date of deparure:' + this.selectedFlight.departuredate + '$' +
    'Time of deparure: ' + this.selectedFlight.departuretime + '$' +
    'Time of arrival: ' + this.selectedFlight.arrivaltime + '$'+
    '$$';

    console.log(this.bodyMessage);

    this._bookService.createFlightTicket(this.flightTicket).subscribe((bookFlight) => {
    }, (error) => {
      console.log(error);
    });

    this._bookService.getFlightSeat(this.selectedFlight.id).subscribe((seat) => {
      this.seat = seat;
    }, (error) => {
      console.log(error);
    });

    if (this.additionalTravellers.length == this.loop) {
      this.loop = 0;
    }
  }

  sendEmail(email: Email) {
    this.email.body = this.bodyMessage;
    this.email.subject = "Book Summary";
    this.email.to = this.u.email;

    email = this.email;

    console.log(email);

    //this.attatchTicket();

    this._bookService.sendEmail(email).subscribe((result) => {
    }, (error) => {
      console.log(error);
    });
  }

  attatchTicket() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.text('hello', 20, 20);
    let attachment = pdf.output('datauristring');
    window.open("matsekolenghope120@gmail.com?subject=Test&body=Test&attachments='" + attachment + "'");
  }
}
