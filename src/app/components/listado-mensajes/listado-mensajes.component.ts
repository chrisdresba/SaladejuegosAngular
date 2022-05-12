import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-listado-mensajes',
  templateUrl: './listado-mensajes.component.html',
  styleUrls: ['./listado-mensajes.component.scss']
})
export class ListadoMensajesComponent implements OnInit {

  listadoMensajes: Observable<any[]>;
  constructor(public chat: ChatService) {
    this.listadoMensajes = chat.chats;

  }

  ngOnInit(): void {
  }

 /* guardarMensaje(mensaje: any) {

    this.chat.guardarMensaje('mensajes', String(localStorage.getItem('usuario')), mensaje);
  }*/

}



