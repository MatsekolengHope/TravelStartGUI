import { TestBed, inject } from '@angular/core/testing';

import { FlightTicketService } from './flight-ticket.service';

describe('FlightTicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightTicketService]
    });
  });

  it('should be created', inject([FlightTicketService], (service: FlightTicketService) => {
    expect(service).toBeTruthy();
  }));
});
