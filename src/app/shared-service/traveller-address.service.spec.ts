import { TestBed, inject } from '@angular/core/testing';

import { TravellerAddressService } from './traveller-address.service';

describe('TravellerAddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravellerAddressService]
    });
  });

  it('should be created', inject([TravellerAddressService], (service: TravellerAddressService) => {
    expect(service).toBeTruthy();
  }));
});
