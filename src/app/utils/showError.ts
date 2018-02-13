import { ToastrService } from 'ngx-toastr';
import { STORED_TOKEN } from '../constant/local-storage';
import { Router } from '@angular/router';


export function showError(err: any, toastr: ToastrService) {
    const errObj = JSON.parse(err._body);
    for (const prop in errObj) {
        if (errObj.hasOwnProperty(prop)) {
            const element = errObj[prop];
            toastr.error(element);
        }
    }
}

export function errorHandler(err: any, toastr: ToastrService, router: Router) {
    if (err.status === 401) {
        toastr.error('Tempo de conexão expirado, por favor realize o login');
        logout(router, toastr);
      } else {
        showError(err, toastr);
      }
}


function logout(router, toastr) {
    Promise.resolve(localStorage.removeItem(STORED_TOKEN))
        .then(res2 => {
            setTimeout(() => {
                return window.location.href = 'index.html';
            }, 2000);
        });
}
