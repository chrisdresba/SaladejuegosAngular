export class Resultados {

    usuario?: string
    puntaje?: number
    juego?: string
    fecha?:string

    constructor(){
    }

    crearResultado(usuario : string, puntaje : number, juego : string, fecha: string){
        this.usuario = usuario;
        this.puntaje = puntaje;
        this.juego = juego;
        this.fecha = fecha;
    }
}
