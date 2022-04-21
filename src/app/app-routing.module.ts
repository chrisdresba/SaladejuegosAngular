import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {QuienSoyComponent} from './components/quien-soy/quien-soy.component';
import {JuegosComponent} from './components/juegos/juegos.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
