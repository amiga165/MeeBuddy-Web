import { Injectable } from '@angular/core';
import { NgxIziToastModule,NgxIzitoastService } from 'ngx-izitoast';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: NgxIzitoastService) { }

    success(Message: string){ this.toastr.success({ message: Message , position: "topRight"}); }

  error(Message: string){ this.toastr.error({ message: Message , position: "topRight"}); }

  info(Message: string){ this.toastr.info({ message: Message , position: "topRight"}); }

  warning(Message: string){ this.toastr.warning({ message: Message , position: "topRight"}); }

}
