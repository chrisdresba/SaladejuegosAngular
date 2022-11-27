export class Usuario {
    usuario:string = '';
    contraseña:string ='';
    nombre:string ='';
    tipo:string = '';

    iniciar(nombre:string,clave:string){
        this.usuario = nombre
        this.contraseña = clave;
    }

    iniciarUsuario(usuario:string,clave:string,nombre:string,tipo:string){
        this.usuario = usuario;
        this.contraseña = clave;
        this.nombre = nombre;
        this.tipo = tipo
    }
}
