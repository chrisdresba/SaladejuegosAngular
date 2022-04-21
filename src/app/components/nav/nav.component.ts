import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signOut } from "firebase/auth";


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public usuarioLogin: string = '';
  public tituloBtn: string = '';
  public auth2: boolean;

  constructor(public router: Router, public afAuth: AngularFireAuth) {

    let dato = localStorage.getItem('ingresado');
    if (dato == 'true') {
      this.auth2 = true;
      this.usuarioLogin = String(localStorage.getItem('usuario'));
    } else {
      this.auth2 = false;
    }
  }

  ngOnInit(): void {
  }

  async redirigirLogin() {
    this.router.navigate(['/login']);
  }

  async cerrarSesion() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.usuarioLogin = '';
      localStorage.removeItem('ingresado');
      this.auth2 = false;
    }).catch((error) => {
      console.info('Se produjo un error');
    });
  }

}
