import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Mensaje } from 'src/app/class/mensaje';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-listado-mensajes',
  templateUrl: './listado-mensajes.component.html',
  styleUrls: ['./listado-mensajes.component.scss']
})
export class ListadoMensajesComponent implements OnInit {

  listadoMensajes: Observable<Mensaje[]>;

  constructor(public chat: ChatService) {

    this.listadoMensajes = chat.chats;
    this.listadoMensajes = this.listadoMensajes.pipe(
      map(docs => {
        return docs.sort((a?, b?) => (((a.fecha! > b.fecha!) || (a.fecha! == b.fecha! && a.hora! > b.hora!)) ? 1 : -1));
      })
    );
  }

  ngOnInit(): void {
  }

}



