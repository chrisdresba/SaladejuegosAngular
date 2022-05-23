import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ChatComponent} from './components/chat/chat.component';
import {QuienSoyComponent} from './components/quien-soy/quien-soy.component';
import {JuegosComponent} from './components/juegos/juegos.component';
import {AhorcadoComponent} from './components/listado-juegos/ahorcado/ahorcado.component';
import {MayormenorComponent} from './components/listado-juegos/mayormenor/mayormenor.component';
import {PreguntadosComponent} from './components/listado-juegos/preguntados/preguntados.component';
import {JuegopropioComponent} from './components/listado-juegos/juegopropio/juegopropio.component';
import {EncuestaComponent} from './components/encuesta/encuesta.component';
import {ResultadosComponent} from './components/resultados/resultados.component';
import { GuardGuard } from './guard/guard.guard';
import { Page404Component } from './components/page404/page404.component';
import { EncuestasComponent } from './components/encuestas/encuestas.component';
import { RolesGuard } from './guard/roles.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component : LoginComponent 
  },
  {
    path: 'home',
    component : HomeComponent
  },
  {
    path: 'quiensoy',
    component : QuienSoyComponent
  },
  {
    path: 'juegos',
    component : JuegosComponent,
    canActivate: [GuardGuard],
    //children:
  },{
        path: 'juegos/ahorcado',
        component : AhorcadoComponent
      },
      {
        path: 'juegos/mayormenor',
        component :MayormenorComponent
      },
      {
        path: 'juegos/preguntados',
        component :PreguntadosComponent
      },
      {
        path: 'juegos/juegopropio',
        component :JuegopropioComponent
      }
  ,
  {
    path: 'chat',
    component : ChatComponent 
  },
  {
    path: 'encuesta',
    component : EncuestaComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'resultados',
    component : ResultadosComponent,
  },
  {
    path: 'encuestas',
    component : EncuestasComponent,
    canActivate: [RolesGuard], 
  },
  {
    path: '**',
    component :Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
