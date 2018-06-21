import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../shared-service/flight.service';
import { Flight } from '../../model-classes/flight';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  private London: String;
  private Paris: String;
  private Tokyo: String;
  private flights: Flight[] = [];

  constructor(private _flightService: FlightService) { }

  ngOnInit() {
    this._flightService.getFlights().subscribe((flights) => {
      console.log(flights);
      this.flights = flights;
    }, (error) => {
      console.log(error);
    });
  }


  onSubmit = function (tab) {
    console.log(tab);
  }

  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    console.log('' + value);

    if ('' + value == 'London') {
      this.London = 'Active';
      this.Paris = null;
      this.Tokyo = null;
    } if ('' + value == 'Paris') {
      this.London = null;
      this.Paris = 'Active';
      this.Tokyo = null;
    } if ('' + value == 'Tokyo') {
      this.London = null;
      this.Paris = null;
      this.Tokyo = 'Active';
    }
  }

   /* @ViewChild('content') content: ElementRef;
  downloadPDF() {
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 300,
      'elementHandlers': specialElementHandlers
    });

    //this.bodyMessage = content;

    //doc.save('test.pdf');
  }*/
}
