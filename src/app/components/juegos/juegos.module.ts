import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from '../listado-juegos/ahorcado/ahorcado.component';
import { MayormenorComponent } from '../listado-juegos/mayormenor/mayormenor.component';
import { PreguntadosComponent } from '../listado-juegos/preguntados/preguntados.component';
import { Page404Component } from './../page404/page404.component';
import { JuegosRoutingModule } from './juegos-routing.module';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NotimageDirective } from './../../directivas/notimage.directive';


@NgModule({
  declarations: [
    JuegosComponent,
    AhorcadoComponent,
    MayormenorComponent,
    PreguntadosComponent,
    Page404Component,
    NotimageDirective
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class JuegosModule { }
