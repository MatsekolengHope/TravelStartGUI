import { TestBed, inject } from '@angular/core/testing';

import { AdditionalTravellersService } from './additional-travellers.service';

describe('AdditionalTravellersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionalTravellersService]
    });
  });

  it('should be created', inject([AdditionalTravellersService], (service: AdditionalTravellersService) => {
    expect(service).toBeTruthy();
  }));
});
