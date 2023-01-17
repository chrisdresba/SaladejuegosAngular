import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CarouselModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  public getScreenHeight: any;
  public sesion:boolean = false;

  constructor(   public viewportScroller: ViewportScroller,  public afAuth: AngularFireAuth) { 
  }

  ngOnInit(): void {
    this.getScreenHeight = window.innerHeight;
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.sesion =true;
      }
    })
  }

  irJuegos(){
    this.viewportScroller.scrollToPosition([0, this.getScreenHeight]);
  }

}
