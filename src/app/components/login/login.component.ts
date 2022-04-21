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
import { ServiceFirebase } from '../services/firebase.service';

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

  constructor(public router: Router, public afAuth: AngularFireAuth, public fb: FormBuilder,public database: ServiceFirebase) {
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required),
    })
  }

  ngOnInit(): void {
  }

  async guardar() {

    try {
      if (this.validarEmail(this.emailRegistro) && this.validarContraseña(this.passwordRegistro)) {
        let usuario = new Usuario();
        usuario.iniciarUsuario(this.emailRegistro, this.passwordRegistro, this.nombreUsuario);

        this.afAuth.createUserWithEmailAndPassword(usuario.usuario, usuario.contraseña).then(res => {
          localStorage.setItem('usuario', usuario.usuario);
          this.guardarLog(usuario.usuario);
          localStorage.setItem('ingresado', 'true');
          this.router.navigate(['/home']);
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
      let form = this.formularioLogin.value;
      let usuario = new Usuario();
      usuario.iniciar(this.email, this.password);

      if (this.validarEmail(this.email) && this.validarContraseña(this.password)) {

        this.afAuth.signInWithEmailAndPassword(usuario.usuario, usuario.contraseña).then(res => {
          localStorage.setItem('usuario', usuario.usuario);
          localStorage.setItem('ingresado', 'true');
          this.guardarLog(usuario.usuario);
          this.router.navigate(['/home']);
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

  guardarLog(usuario:any){

    let pipe = new DatePipe('en-US');
    let log = {
      usuario: usuario,
      fechaDeIngreso: pipe.transform(Date.now(), 'dd/MM/yyyy')
    }

    this.database.createLog('logsUsuarios',log);
  }

  


}
