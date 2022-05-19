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

  

  constructor(public serv: EncuestaService, public fb: FormBuilder, public afAuth: AngularFireAuth) {
    this.formulario = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'edad': new FormControl('', Validators.required),
      'telefono': new FormControl('',Validators.required),
      'resp1': new FormControl('', Validators.required),
      'resp2': new FormControl('', Validators.required),
      'resp3': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.usuario = this.afAuth.onAuthStateChanged(user =>{
      if(!user){
        this.email = 'anonimo';
        }else{
          this.usuario = user;
          this.email = this.usuario.email;
        }
   })
  } 

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.resp3.push(event.target.value);
    }
  }

  guardarEncuesta() {
    if (
      !this.nombre ||
      !this.apellido ||
      (!(this.edad<99 && this.edad>=18))||
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
