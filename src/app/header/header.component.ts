import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { showError, errorHandler } from '../utils/showError';
import { LoginService } from '../login.service';
import { User } from '../models/user';
import { STORED_TOKEN } from '../constant/local-storage';
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modal: any;

  @ViewChild('formularioRecuperar') FormularioRecuperar: ElementRef;
  @ViewChild('formularioLogin') FormularioLogin: ElementRef;
  @ViewChild('buttonEntrar') ButtonEntrar: ElementRef;
  @ViewChild('buttonSair') ButtonSair: ElementRef;
  @ViewChild('buttonHome') ButtonHome: ElementRef;
  user: User = new User();

  constructor(private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router) {
    this.modal = 'login';
  }

  ngOnInit() {
    this.verificarStatusLogin();
  }

  verificarStatusLogin() {
    if (!!localStorage.getItem(STORED_TOKEN)) {
      this.ButtonEntrar.nativeElement.style.display = 'none';
      this.ButtonSair.nativeElement.style.display = 'block';
      this.ButtonHome.nativeElement.style.display = 'block';
    } else {
      this.ButtonEntrar.nativeElement.style.display = 'block';
      this.ButtonSair.nativeElement.style.display = 'none';
      this.ButtonHome.nativeElement.style.display = 'none';
    }
  }

  closeModal() {
    jQuery('#modal-login').modal('hide');
  }

  login() {
    this.loginService.login(this.user)
      .then(result => {
        localStorage.setItem(STORED_TOKEN, result.token);
        this.router.navigate(['admin']);
        this.closeModal();
        this.user = new User();
        this.verificarStatusLogin();
      })
      .catch(err => errorHandler(err, this.toastr, this.router));
  }

  logout() {
    localStorage.removeItem(STORED_TOKEN);
    this.verificarStatusLogin();
    this.router.navigate(['']);
  }

}
