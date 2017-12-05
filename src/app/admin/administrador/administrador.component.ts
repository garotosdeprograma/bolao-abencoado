import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  @ViewChild('jogos') Jogos: ElementRef;
  
  constructor() { }

  ngOnInit() {
  }

  mostrarJogos() {
    this.Jogos.nativeElement.style.right = '0';    
    this.Jogos.nativeElement.style.width = '100vw';
    this.Jogos.nativeElement.style.display = 'block';        
  }

  voltar() {
    this.Jogos.nativeElement.style.right = '-100px';    
    this.Jogos.nativeElement.style.width = '0';
    this.Jogos.nativeElement.style.display = 'none';
  }
}
