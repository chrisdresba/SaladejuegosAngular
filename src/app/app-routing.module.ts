import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {ChatComponent} from './pages/chat/chat.component';
import {QuienSoyComponent} from './pages/quien-soy/quien-soy.component';
import {EncuestaComponent} from './pages/encuesta/encuesta.component';
import {ResultadosComponent} from './pages/resultados/resultados.component';
import { GuardGuard } from './guard/guard.guard';
import { Page404Component } from './pages/page404/page404.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
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
    component : HomeComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'quiensoy',
    component : QuienSoyComponent
  },
  {
    path: 'juegos',
    loadChildren: () => import('./pages/juegos/juegos.module').then(m => m.JuegosModule)
  },
  {
    path: 'chat',
    component : ChatComponent ,
    canActivate: [GuardGuard]
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
