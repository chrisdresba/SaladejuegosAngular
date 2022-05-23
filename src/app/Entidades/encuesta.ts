export class Encuesta {
usuario?: string
nombre?: string
apellido?: string
edad?: number
telefono?: string
RespuestaExperiencia?:string
RespuestaPreferencias?:string
RespuestaJuegos?:string []


    constructor(usuario : string, nombre : string, apellido :string, edad:number,telefono:string,resp1:string,resp2:string,resp3:string[]){
        this.usuario = usuario
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.telefono = telefono;
        this.RespuestaExperiencia = resp1;
        this.RespuestaPreferencias = resp2;
        this.RespuestaJuegos = resp3;
    }
}
