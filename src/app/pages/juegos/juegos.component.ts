import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  public loading:boolean = true;
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = false;
    },500)
  }

}
