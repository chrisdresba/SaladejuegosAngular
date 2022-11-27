export class Mensaje {
    usuario?: string
    mensaje?: string
    fecha?: string
    hora?: string

    constructor(usuario : string, mensaje : string, fecha :string, hora:string){
        this.usuario = usuario
        this.mensaje = mensaje;
        this.fecha = fecha;
        this.hora = hora;
    }
}
