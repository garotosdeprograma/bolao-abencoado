import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../models/user';
import { STORED_TOKEN } from '../constant/local-storage';
import { ToastrService } from 'ngx-toastr';
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
        this.route.navigate(['/admin/administrador']);
        this.closeModal();
        this.user = new User();
      })
      .catch(err => {
        const errObj = JSON.parse(err._body);
        console.log(errObj);
        for (const prop in errObj) {
          if (errObj.hasOwnProperty(prop)) {
            const element = errObj[prop];
            this.toastr.error(element);
          }
        }
      });
  }

  recuperarSenha() {
    this.FormularioRecuperar.nativeElement.style.display = 'block';
    this.FormularioLogin.nativeElement.style.display = 'none';
  }
}
