import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-juegopropio',
  templateUrl: './juegopropio.component.html',
  styleUrls: ['./juegopropio.component.scss']
})
export class JuegopropioComponent implements OnInit {

  @ViewChild('canvas', { static: true }) private canvas!: ElementRef;

  _gameSpeed = 200;
  get gameSpeed() {
    return this._gameSpeed;
  }
  set gameSpeed(speed: number) {
    this._gameSpeed = speed;
    this.game.setGameSpeed(speed);
  }

  constructor(public game: GameService) {}

  ngAfterViewInit() {
    this.game.setCanvas(this.canvas.nativeElement);
    this.game.start();
  }
  ngOnInit(): void {
  }



}
