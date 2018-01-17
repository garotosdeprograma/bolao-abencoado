import { TestBed, inject } from '@angular/core/testing';

import { RodadaService } from './rodada.service';

describe('RodadaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RodadaService]
    });
  });

  it('should be created', inject([RodadaService], (service: RodadaService) => {
    expect(service).toBeTruthy();
  }));
});
