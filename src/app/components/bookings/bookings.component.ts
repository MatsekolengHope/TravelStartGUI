import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BookService } from '../../shared-service/book.service';
import { BookFlight } from '../../model-classes/book-flight';
import { Router } from '@angular/router';
import { RouteConfigLoadStart } from '@angular/router';
import { User } from '../../model-classes/user';
import { FlightTicket } from '../../model-classes/flight-ticket';

import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
declare function require(path: String);

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  private user: User = JSON.parse(localStorage.getItem('user'));
  private flightTickets: FlightTicket[];

  private ticket: FlightTicket = new FlightTicket;

  private displayTicket: boolean = false;

  private imageSource: String;

  constructor(private _router: Router, private _bookService: BookService) { }

  ngOnInit() {
    this.flightTickets = JSON.parse(localStorage.getItem('flightTickets'));
    this.imageSource = require('./img/img_528940.png');
  }

  @ViewChild('content') content: ElementRef;
  downloadTicket() {
    html2canvas(document.getElementById('content')).then(function(canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img,'JPEG',0,0);
      doc.save('ticket.pdf');
    });
  }

  cancelBooking(ticket: FlightTicket) {
    console.log(ticket);
  }

  viewTicket(ticket) {
    this.displayTicket = true;
    this.ticket = ticket;
  }

  close(){
    this.displayTicket = false;
  }
}
