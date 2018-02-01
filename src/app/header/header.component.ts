import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { showError } from '../utils/showError';
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

  @ViewChild('formularioRecuperar') FormularioRecuperar: ElementRef;
  @ViewChild('formularioLogin') FormularioLogin: ElementRef;
  user: User = new User();

  constructor(private loginService: LoginService, private toastr: ToastrService, private route: Router) { }

  ngOnInit() {
  }

  closeModal() {
    jQuery('#modal-login').modal('hide');
  }

  login() {
    this.loginService.login(this.user)
      .then(result => {
        localStorage.setItem(STORED_TOKEN, result.token);
        this.route.navigate(['admin']);
        this.closeModal();
        this.user = new User();
        (<HTMLElement>document.getElementById('botaoEntrarSair')).innerHTML = '<i class="fa pr-2 d-inline fa-lg fa-user-circle"></i><span>Sair</span>';
      })
      .catch(err => {
        showError(err, this.toastr);
      });
  }
}
