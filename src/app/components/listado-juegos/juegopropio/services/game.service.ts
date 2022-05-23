import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Resultados } from 'src/app/Entidades/resultados';
import { ResultadosService } from 'src/app/services/resultados.service';
import Swal from 'sweetalert2';
import { DrawService } from './draw.service';
import { SnakeService, Direction, TurnResult } from './snake.service';

export interface GameConfig {
  horizontalBlocks: number;
  verticalBlocks: number;
  gameSpeed: number;
  options: GameOptions;
}

export interface GameOptions {
  canGoThroughItself: boolean;
  canGoThroughWalls: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  config: GameConfig;
  draw!: DrawService;
  gameLoop: any;
  keydownListener!: EventListener;
  puntaje = 0;
  usuario:any;
  email:string='';

  constructor(private snake: SnakeService,public serv: ResultadosService,public afAuth: AngularFireAuth) {
    this.config = {
      horizontalBlocks: 20,
      verticalBlocks: 20,
      gameSpeed: 200,
      options: {
        canGoThroughItself: false,
        canGoThroughWalls: false,
      },
    };
    this.snake.options = this.config.options;
    this.snake.generateSnack(this.config);
    this.usuario = this.afAuth.onAuthStateChanged(user => {
      if (!user) {
        this.email = 'anonimo';
      } else {
        this.usuario = user;
        this.email = this.usuario.email;
      }
    })
  }
 

  gameOver() {
    this.finPartida();
    this.puntaje = 0;
  }

  isRunning() {
    return !!this.gameLoop;
  }

  keydown(e: KeyboardEvent) {
    const allowedKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'w',
      's',
      'a',
      'd',
    ];
    if (allowedKeys.indexOf(e.key) === -1) {
      return;
    }

    let direction!: Direction;
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        direction = Direction.Up;
        break;
      case 'ArrowDown':
      case 's':
        direction = Direction.Down;
        break;
      case 'ArrowLeft':
      case 'a':
        direction = Direction.Left;
        break;
      case 'ArrowRight':
      case 'd':
        direction = Direction.Right;
        break;
    }

    this.snake.direction = direction;
  }

  restart() {
    this.stop();
    this.puntaje = 0;
    this.snake.initStartingPosition();
    this.snake.generateSnack(this.config);
    this.start();
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.draw = new DrawService(canvas);
    this.draw.initCanvas(this.config);
  }

  setGameSpeed(speed: number) {
    this.config.gameSpeed = speed;
    this.stop();
    this.start();
  }

  start() {
    document.addEventListener('keydown', (e) => this.keydown(e));
    this.drawGame();
    this.initGameLoop();
  }

  stop() {
    document.removeEventListener('keydown', this.keydown);
    clearInterval(this.gameLoop);
    this.gameLoop = null;
  }

  private drawGame() {
    this.draw.clearCanvas(this.config);
    this.draw.drawBorder(this.config);
    this.draw.drawSnake(this.snake.positions);
    this.draw.drawSnack(this.snake.snackPosition);
  }

  private initGameLoop() {
    this.gameLoop = setInterval(() => {
      const turnResult: TurnResult = this.snake.turn(this.config);

      switch (turnResult) {
        case TurnResult.Collision:
          this.stop();
          this.gameOver();
          break;
        case TurnResult.EatingSnack:
          this.puntaje = this.puntaje + 2;
          break;
      }

      this.drawGame();
    }, this.config.gameSpeed);
  }

  finPartida() {
    this.saveResult();
    Swal.fire({
      icon: 'error',
      title: 'Perdiste, vuelve a intentarlo',
      showConfirmButton: false,
      timer: 3000,
    });
  }
  saveResult() {
    let pipe = new DatePipe('en-US');
    let fecha = String(pipe.transform(Date.now(), 'dd/MM/yyyy'));
    let resultado = new Resultados();
    resultado.crearResultado(this.email, this.puntaje,'snake', fecha);
    this.serv.guardarResultado(resultado);
  }
}
