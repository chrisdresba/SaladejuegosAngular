import { Component, Input, OnInit } from '@angular/core';
import { Encuesta } from 'src/app/class/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

  @Input() public listado? : Encuesta[];
 
  constructor(public act: EncuestaService) { 
    this.listado = [];
  }

  ngOnInit(): void {
    this.act.getEncuestas().subscribe(aux => {
      this.listado = aux;
    })
    
  }

}