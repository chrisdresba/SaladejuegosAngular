import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot,Router,CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AutentificadorService } from '../services/autentificador.service';


@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
 
  constructor(private cookie : CookieService, private routeo : Router,private auth: AutentificadorService,public afAuth: AngularFireAuth) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('sesionSala')||this.auth.estaLogueado == true){
     return true
      }else{
        this.routeo.navigate(["/login"], {replaceUrl:true});
        return false
      }
  }
  
}
