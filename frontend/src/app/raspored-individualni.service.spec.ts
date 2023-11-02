import { TestBed } from '@angular/core/testing';

import { RasporedIndividualniService } from './raspored-individualni.service';

describe('RasporedIndividualniService', () => {
  let service: RasporedIndividualniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RasporedIndividualniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
