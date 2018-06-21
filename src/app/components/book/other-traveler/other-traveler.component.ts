import { Component, OnInit } from '@angular/core';
import { AdditionalTravellers } from '../../../model-classes/additional-travellers';

@Component({
  selector: 'app-other-traveler',
  templateUrl: './other-traveler.component.html',
  styleUrls: ['./other-traveler.component.css']
})
export class OtherTravelerComponent implements OnInit {

  private travellers: AdditionalTravellers[] = JSON.parse(sessionStorage.getItem('additionalTravellers'));

  constructor() { }

  ngOnInit() {
  }

 
}
