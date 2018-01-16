import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostaComponent } from './aposta.component';

describe('ApostaComponent', () => {
  let component: ApostaComponent;
  let fixture: ComponentFixture<ApostaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApostaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
