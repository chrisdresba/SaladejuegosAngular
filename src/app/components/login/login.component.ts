import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entidades/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import Swal from 'sweetalert2';
import { FirebaseService } from './../../services/firebase.service';
import { AutentificadorService } from 'src/app/services/autentificador.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  public email: any;
  public password: any;
  public nombreUsuario: any;
  public emailRegistro: any;
  public passwordRegistro: any;
  public objeto: any;
  public listado: Usuario[] = [];

  constructor(public router: Router, public afAuth: AngularFireAuth, public fb: FormBuilder, public database: FirebaseService, public servicioAuth: AutentificadorService) {
    this.formularioLogin = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'contraseña': ['', [Validators.required, Validators.minLength(6)]],
      'nombreUsuario': ['', Validators.required, Validators.maxLength(20)],
      'emailRegistro': ['', [Validators.required, Validators.email]],
      'passwordRegistro': ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
    this.servicioAuth.getUsuarios().subscribe(usuario => {
      this.listado = usuario;
    })

  }

  async guardar() {

    try {

      if (this.validarEmail(this.emailRegistro) && this.validarContraseña(this.passwordRegistro)) {

        let usuario = new Usuario();
        usuario.iniciarUsuario(this.emailRegistro, this.passwordRegistro, this.nombreUsuario, 'usuario'); //desde la página registar, solo pueden hacerlo de tipo usuario
        this.afAuth.createUserWithEmailAndPassword(usuario.usuario, usuario.contraseña).then(res => {
          this.servicioAuth.loguearse();
          localStorage.setItem('sesionSala', usuario.usuario);
          localStorage.setItem('sesionSalaRol', 'usuario');
          this.guardarUsuario(this.nombreUsuario, this.emailRegistro, this.passwordRegistro, 'usuario');
          this.guardarLog(usuario.usuario);
          this.router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `El usuario ${usuario.usuario} se a registrado con exito!`,
            showConfirmButton: false,
            timer: 1500
          })
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'El email ya se encuentra registrado!'
          })
        })

      }

      if (!this.validarEmail(this.emailRegistro) && !this.validarContraseña(this.passwordRegistro)) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'El email y la contraseña son incorrectos!'
        })
      } else if (!this.validarEmail(this.emailRegistro) && this.validarContraseña(this.passwordRegistro)) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Debe ingresar un email!'
        })
      } else if (this.validarEmail(this.emailRegistro) && !this.validarContraseña(this.passwordRegistro)) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'La contraseña debe tener un minimo de 6 caracteres!'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El email o la contraseña son incorrectos!'
      })
    }

  }

  async ingresar() {
    try {

      let usuario = new Usuario();
      usuario.iniciar(this.email, this.password);
      if (this.validarEmail(this.email) && this.validarContraseña(this.password)) {
        this.afAuth.signInWithEmailAndPassword(usuario.usuario, usuario.contraseña).then(res => {
          this.servicioAuth.loguearse();
          let rol = this.rol(usuario.usuario);
          localStorage.setItem('sesionSala', usuario.usuario);
          localStorage.setItem('sesionSalaRol', rol);
          this.guardarLog(usuario.usuario);
          setTimeout(()=>{ this.router.navigate(['/home'])},2000)
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'El usuario o la contraseña son incorrectos!'
          })
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'El usuario o la contraseña son incorrectos!'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El usuario o la contraseña son incorrectos!'
      })
    }

  }

  async ingresarInvitado() {
    this.email = 'invitado@gmail.com';
    this.password = '123456';
  }

  async ingresarAdmin() {
    this.email = 'admin@admin.com';
    this.password = '123456';
  }

  async registrarInvitado() {
    this.nombreUsuario = 'Cristian Barraza';
    this.emailRegistro = 'invitado2@gmail.com';
    this.passwordRegistro = '123456';
  }

  validarEmail(email: string) {
    let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  validarContraseña(contraseña: string) {
    if (contraseña.length >= 6) {
      return true;
    } else {
      return false;
    }
  }

  guardarLog(usuario: any) {

    let pipe = new DatePipe('en-US');
    let log = {
      usuario: usuario,
      fechaDeIngreso: pipe.transform(Date.now(), 'dd/MM/yyyy')
    }

    this.database.crearDatos('logsUsuarios', log);
  }

  guardarUsuario(usuario: any, email: any, clave: any, rol: any) {
    let user = {
      'nombre': usuario,
      'usuario': email,
      'password': clave,
      'tipo': rol
    }
    this.database.crearDatos('usuarios', user);
  }

  rol(usuario: string) {

    let rol = '';
    this.listado.forEach((item) => {
      if (item.usuario == usuario) {
        rol = item.tipo;
        return rol;
      }
    })
    return rol;
  }



}
