import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('formularioRecuperar') FormularioRecuperar: ElementRef;
  @ViewChild('formularioLogin') FormularioLogin: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    jQuery('#modal-login').modal('hide');
    this.FormularioLogin.nativeElement.style.display = 'block';
    this.FormularioRecuperar.nativeElement.style.display = 'none';
  }

  recuperarSenha() {
    this.FormularioRecuperar.nativeElement.style.display = 'block';
    this.FormularioLogin.nativeElement.style.display = 'none';
  }
}
