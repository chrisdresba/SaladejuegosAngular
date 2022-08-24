import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  usuario: any;
  email:string = '';
  formulario: FormGroup;
  public mensaje: any;
  public auth2: boolean = false;

  constructor(public chat: ChatService, public fb: FormBuilder, public afAuth: AngularFireAuth) {

    this.formulario = this.fb.group({
      'mensaje': new FormControl("", [Validators.required,Validators.maxLength(100)]),
    })

  }

  ngOnInit(): void {
 
    this.usuario = this.afAuth.onAuthStateChanged(user =>{
      if(!user){
        this.email = 'anonimo';
        this.auth2 = false;
        }else{
          this.auth2 = true;
          this.usuario = user;
          this.email = this.usuario.email;
        }
   })
  }

  guardarMensaje() {
    this.chat.guardarMensaje(this.email, this.mensaje);
    this.mensaje = '';
  }

}
