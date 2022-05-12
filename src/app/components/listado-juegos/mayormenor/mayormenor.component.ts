import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.scss']
})
export class MayormenorComponent implements OnInit {

  public carta1: number = 6;
  public carta2: string = "";
  public random: number = 0;
  public puntaje: number = 0;
  public mensaje?: string;

  constructor() { }

  ngOnInit(): void {
  }

  partida() {
    this.random = Math.round(Math.random() * 12);
    this.carta2 = this.random.toString();
  }

  menor(){
    this.partida();

    if(this.carta1 > this.random){
      this.mensaje = "Excelente";
      this.puntaje++;
    }else{
      this.mensaje = "Fallaste";
    }

    setTimeout(()=>{
      this.mensaje = ""; 
      this.carta1 = this.random; 
      this.carta2 = ""
    },3000)
  }

  mayor(){
    this.partida();

    if(this.carta1 < this.random){
      this.mensaje = "Excelente";
      this.puntaje++;
    }else{
      this.mensaje = "Fallaste";
    }
   
    setTimeout(()=>{
      this.mensaje = ""; 
      this.carta1 = this.random; 
      this.carta2 = ""
    },3000)
  }
}
