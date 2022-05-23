import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificadorService } from '../services/autentificador.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
 
  rol:any;

  constructor(private routeo : Router,private auth: AutentificadorService,public afAuth: AngularFireAuth) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('sesionSala')){
        this.rol = localStorage.getItem('sesionSalaRol');
        if(this.rol == 'admin'){
          return true
        } 
     return false
      }else{
        this.routeo.navigate(["/home"], {replaceUrl:true});
        return false
      }
  }
  
}
