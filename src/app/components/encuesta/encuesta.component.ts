import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { EncuestaService } from './../../services/encuesta.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  formulario: FormGroup;
  usuario: any;
  email: string = '';
  nombre: string = '';
  apellido: string = '';
  edad: number = 0;
  telefono: string = '';
  resp1: string = '';
  resp2: string = '';
  resp3: any = [];


  constructor(public serv: EncuestaService, public router: Router, public fb: FormBuilder, public afAuth: AngularFireAuth) {
    this.formulario = this.fb.group({
      'nombre': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'apellido': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      'telefono': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      'resp1': ['', Validators.required],
      'resp2': ['', Validators.required],
      'resp3': ['', Validators.required]
    });

  }

  ngOnInit(): void {

  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.resp3.push(event.target.value);
    }
  }

  guardarEncuesta() {

    this.usuario = this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.usuario = user;
        this.email = this.usuario.email;
      }
    })

    if (
      !this.nombre ||
      !this.apellido ||
      (!(this.edad < 99 && this.edad >= 18)) ||
      this.telefono.length != 10 ||
      !this.resp1 ||
      !this.resp2 ||
      !this.resp3
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe ingresar todos los datos',
        showConfirmButton: false,
        timer: 1500,
      });

    } else {

      this.serv.guardarEncuesta(
        this.email,
        this.nombre,
        this.apellido,
        this.edad,
        this.telefono,
        this.resp1,
        this.resp2,
        this.resp3
      );
      this.reiniciarValores();
      Swal.fire({
        icon: 'success',
        title: 'La encuesta fue creada con exito',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000)


    }
  }

  reiniciarValores() {
    this.usuario = '';
    this.nombre = '';
    this.apellido = '';
    this.edad = 0;
    this.telefono = '';
    this.resp1 = '';
    this.resp2 = '';
    this.resp3 = [];
  }
}
