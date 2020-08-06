import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";


@Controller('usuario')
export class UsuarioController {

    arregloUsuarios = [
        {
            id:1,
            nombre: "Edison",
        },
        {
            id:2,
            nombre: "Sancho"
        },
        {
            id:3,
            nombre: "Manolo"
        }
    ]
    idActual = 3

    @Get()
    mostrarTodos(){
        return this.arregloUsuarios
    }

    @Post()
    crearUno(
        @Body() paramBody
    ){
        const nuevoUsuario = {
            id:this.idActual+1,
            nombre: paramBody.nombre
        }

        this.arregloUsuarios.push(nuevoUsuario)
        this.idActual += 1
        return nuevoUsuario
    }

    @Get(':id')
    verUno(
        @Param() paramRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(paramRuta.id)
        )

        return this.arregloUsuarios[indice]
    }


    @Put(':id')
    editarUno(
        @Param() paramRuta,
        @Body() paramBody,
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(paramRuta.id)
        )

        this.arregloUsuarios[indice].nombre = paramBody.nombre;
        return this.arregloUsuarios[indice]
    }


    @Delete(':id')
    eliminarUno(
        @Param() paramRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(paramRuta.id)
        )

        this.arregloUsuarios.splice(indice,1)
        return this.arregloUsuarios[indice]
    }

}


