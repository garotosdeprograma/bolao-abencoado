import { TestBed, inject } from '@angular/core/testing';

import { ApostaService } from './aposta.service';

describe('ApostaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApostaService]
    });
  });

  it('should be created', inject([ApostaService], (service: ApostaService) => {
    expect(service).toBeTruthy();
  }));
});
