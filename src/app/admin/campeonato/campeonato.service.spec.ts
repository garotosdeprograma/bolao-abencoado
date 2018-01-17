import { TestBed, inject } from '@angular/core/testing';

import { CampeonatoService } from './campeonato.service';

describe('CampeonatoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampeonatoService]
    });
  });

  it('should be created', inject([CampeonatoService], (service: CampeonatoService) => {
    expect(service).toBeTruthy();
  }));
});
