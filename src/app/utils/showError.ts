import { ToastrService } from 'ngx-toastr';


export function showError(err: any, toastr: ToastrService) {
    const errObj = JSON.parse(err._body);
    for (const prop in errObj) {
        if (errObj.hasOwnProperty(prop)) {
            const element = errObj[prop];
            toastr.error(element);
        }
    }
}
