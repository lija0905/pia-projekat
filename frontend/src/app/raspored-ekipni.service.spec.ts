import { TestBed } from '@angular/core/testing';

import { RasporedEkipniService } from './raspored-ekipni.service';

describe('RasporedEkipniService', () => {
  let service: RasporedEkipniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RasporedEkipniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
