import { Component,OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Resultados } from 'src/app/Entidades/resultados';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  @Input() public listado? : Resultados[];
  @Output() actorSeleccionado: EventEmitter<any>= new EventEmitter<any>(); 
  constructor(public act: ResultadosService) { 
    this.listado = [];
  }

  ngOnInit(): void {
    this.act.getResultados().subscribe(aux => {
      this.listado = aux;
    })
  }

}
