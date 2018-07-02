import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FlightTicket } from '../model-classes/flight-ticket';

import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import { element } from 'protractor';

declare function require(path: String);

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent implements OnInit {

  private imageSource: String;

  private ticket: FlightTicket = new FlightTicket;

  constructor() { }

  ngOnInit() {

    this.imageSource = require('./img/img_528940.png');

    this.ticket.seat = 1;
    this.ticket.travellerName = 'Hope';
    this.ticket.travellerSurname = 'Matsekoleng';
    this.ticket.arrivalCity = 'JHB - Johanessburg';
    this.ticket.departureCity = 'PLK - Polokwane';
    this.ticket.departureDate = '15 February 2018';
    this.ticket.departureTime = '11:00';
    this.ticket.flightName = 'SAA';
    this.ticket.flightId = 10050;
    this.ticket.arrivalTime = '13:00';
    console.log(this.ticket);
  }

  /*@ViewChild('content') content: ElementRef;
  print() {
    let doc = new jsPDF('p', 'pt', 'a4');

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    }, function (bla) {
      doc.save('test.pdf');
    });
  }*/

  @ViewChild('content') content: ElementRef;
  captureScreenshot() {
  /*let document = this.content.nativeElement; 
    html2canvas(document, {
      onrendered: function (canvas: HTMLCanvasElement) {
        var pdf = new jsPDF('p', 'pt', 'a4');
        var img = canvas.toDataURL("image/png");
        pdf.addImage(img,'JPEG',0,0);
        pdf.save('web.pdf');
      }
    });*/
  }


  download() {
    html2canvas(document.getElementById('content')).then(function(canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img,'JPEG',0,0);
      doc.save('test.pdf');
    });
  }
}
