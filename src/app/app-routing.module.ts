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
    component : JuegosComponent 
  },
  {
    path: 'chat',
    component : ChatComponent 
  },
  {
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
