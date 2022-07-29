import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../listado-juegos/ahorcado/ahorcado.component';
import { MayormenorComponent } from '../listado-juegos/mayormenor/mayormenor.component';
import { PreguntadosComponent } from '../listado-juegos/preguntados/preguntados.component';
import { GuardGuard } from './../../guard/guard.guard';
import { Page404Component } from './../page404/page404.component';
import { JuegosComponent } from './juegos.component';

const routes: Routes = [
  {
    path: '',
    component: JuegosComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'ahorcado',
    component: AhorcadoComponent
  },
  {
    path: 'mayormenor',
    component: MayormenorComponent
  },
  {
    path: 'preguntados',
    component: PreguntadosComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
