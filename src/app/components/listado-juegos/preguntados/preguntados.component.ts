import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PaisService } from 'src/app/services/apiservice.service';
import { Pais } from 'src/app/Entidades/pais';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  base_preguntasJson: any[] = [{
    "pregunta": "¿Cual es la capital de Peru?",
    "respuesta": "Lima",
    "incorrecta1": "Cusco",
    "incorrecta2": "Trujillo",
    "incorrecta3": "Arequipa",
    "imagen": "Peru",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Brasil?",
    "respuesta": "Brasilia",
    "incorrecta1": "San Pablo",
    "incorrecta2": "Rio de Janeiro",
    "incorrecta3": "Fortaleza\r",
    "imagen": "Brazil",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Ecuador?",
    "respuesta": "Quito",
    "incorrecta1": "Guayaquil",
    "incorrecta2": "Ambato",
    "incorrecta3": "Cuzco\r",
    "imagen": "Ecuador",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Colombia?",
    "respuesta": "Bogotá",
    "incorrecta1": "Medellin",
    "incorrecta2": "Cali",
    "incorrecta3": "Cartagena\r",
    "imagen": "Colombia",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de España?",
    "respuesta": "Madrid",
    "incorrecta1": "Sevilla",
    "incorrecta2": "Barcelona",
    "incorrecta3": "La Coruña\r",
    "imagen": "Spain",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Venezuela?",
    "respuesta": "Caracas",
    "incorrecta1": "Amazonas",
    "incorrecta2": "Cali",
    "incorrecta3": "Lara\r",
    "imagen": "Venezuela",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Costa Rica?",
    "respuesta": "San José",
    "incorrecta1": "Liberia",
    "incorrecta2": "Jacó",
    "incorrecta3": "Puntarenas\r",
    "imagen": "Costa Rica",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Chile?",
    "respuesta": "Santiago de Chile",
    "incorrecta1": "Valparaiso",
    "incorrecta2": "Viña del Mar",
    "incorrecta3": "Valdivia\r",
    "imagen": "Chile",
    "objectFit": "cover"
  },
  ];

  pregunta = "";
  categoria = "";
  respuesta = "";
  incorrecta1 = "";
  incorrecta2 = "";
  incorrecta3 = "";
  imagen?: any = "";
  objectFit = "";

  opcion1 = "";
  opcion2 = "";
  opcion3 = "";
  opcion4 = "";

  style = {
    background: ""
  }
  npreguntas = []

  posibles_respuestas: any[] = [];

  suspender_botones = false;

  preguntas_hechas = 0
  preguntas_correctas = 0
  preguntas_incorrectas = 0;

  jugador = {
    email: '',
    ganadas: 0,
    perdidas: 0
  }

  public paises?: Pais[];
  jugadores: any | [];
  user: any;
  public auth2: boolean = false;


  constructor(private service: PaisService, public afAuth: AngularFireAuth, private router: Router) {
    this.service.traerPaises().subscribe((paises: any) => {
      this.paises = paises.slice(0, 249);
    })
  }

  comenzar(){
    this.escogerPreguntaAleatoria();
    this.auth2 = true;
  }

  ngOnInit() {

  }

  elegirPregunta(n: number) {
    const { pregunta, respuesta, incorrecta1, incorrecta2, incorrecta3, imagen, objectFit } = this.base_preguntasJson[n];

    this.devolverImagen(imagen);
    this.pregunta = pregunta;
    this.respuesta = respuesta;
    this.incorrecta1 = incorrecta1;
    this.incorrecta2 = incorrecta2;
    this.incorrecta3 = incorrecta3;
    this.objectFit = objectFit;

  }

  devolverImagen(nombre: any) {
    this.paises?.forEach((value) => {
      if (value.pais == nombre) {
        this.imagen = value.imagen;
      }
    });

  }
  escogerPreguntaAleatoria() {
    const n = Math.floor(Math.random() * this.base_preguntasJson.length)

    this.elegirPregunta(n)
    this.desordenarRespuestas()
  }


  select_id(id: string) {
    return document.getElementById(id)
  }

  desordenarRespuestas() {
    this.posibles_respuestas = [
      this.respuesta,
      this.incorrecta1,
      this.incorrecta2,
      this.incorrecta3
    ]
    this.posibles_respuestas.sort(() => Math.random() - 0.5)

    this.opcion1 = this.posibles_respuestas[0]
    this.opcion2 = this.posibles_respuestas[1]
    this.opcion3 = this.posibles_respuestas[2]
    this.opcion4 = this.posibles_respuestas[3]
  }

  oprimirBtn(res: number) {

    if (this.posibles_respuestas[res] == this.respuesta) {

      Swal.fire({
        icon: 'success',
        title: 'EXCELENTE',
        showConfirmButton: false,
        timer: 1000
      })
      this.jugador.ganadas++

      this.escogerPreguntaAleatoria()
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'INCORRECTO',
        showConfirmButton: false,
        timer: 1000
      })
      this.jugador.perdidas++

      this.escogerPreguntaAleatoria()
    }
  }

}