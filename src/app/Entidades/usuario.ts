export class Usuario {
    usuario:string = '';
    contraseña:string ='';
    nombre:string ='';

    iniciar(nombre:string,clave:string){
        this.usuario = nombre
        this.contraseña = clave;
    }

    iniciarUsuario(usuario:string,clave:string,nombre:string){
        this.usuario = usuario;
        this.contraseña = clave;
        this.nombre = nombre;
    }
}
