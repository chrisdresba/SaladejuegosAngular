import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ChatComponent} from './components/chat/chat.component';
import {QuienSoyComponent} from './components/quien-soy/quien-soy.component';
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
    loadChildren: () => import('./components/juegos/juegos.module').then(m => m.JuegosModule)
  },
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
