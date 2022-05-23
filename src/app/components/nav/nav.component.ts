import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signOut } from "firebase/auth";

import { AutentificadorService } from 'src/app/services/autentificador.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  usuario: any;
  rol: any;
  public usuarioLogin: string = '';
  public tituloBtn: string = '';
  public auth2: boolean = false;
  public admin: boolean = false;


  constructor(public router: Router, public afAuth: AngularFireAuth, public servicioAuth: AutentificadorService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('sesionSalaRol')) {
      this.rol = localStorage.getItem('sesionSalaRol');
      if (this.rol == 'admin') {
        this.admin = true;
      }
    }
    this.usuario = this.afAuth.onAuthStateChanged(user => {
      if (!user) {
        this.auth2 = false;
      } else {
        this.auth2 = true;
        this.usuario = user;
        this.usuarioLogin = this.usuario.email;
      }
    }
    )
  }

  async redirigirLogin() {
    this.router.navigate(['/login']);
  }

  async cerrarSesion() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.usuarioLogin = '';
      this.servicioAuth.desloguearse();
      localStorage.removeItem('sesionSala');
      localStorage.removeItem('sesionSalaRol');
      this.auth2 = false;
      this.admin = false;
      this.router.navigate(['/home']);
    }).catch((error) => {

    });
  }

}
