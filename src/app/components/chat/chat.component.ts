import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  formulario : FormGroup;
  public mensaje: any;
  public auth2: boolean;

  constructor( public chat: ChatService,public fb: FormBuilder) { 

    this.formulario = this.fb.group({
      'mensaje': new FormControl("", Validators.required),
    })

    this.auth2 = false;
    if(String(localStorage.getItem('usuario'))?.length > 0 && localStorage.getItem('usuario')?.length != undefined){
      this.auth2 = true;
    }

  }

  guardarMensaje(){
    this.chat.guardarMensaje(localStorage.getItem('usuario'),this.mensaje);
  }

  ngOnInit(): void {
  }

}
