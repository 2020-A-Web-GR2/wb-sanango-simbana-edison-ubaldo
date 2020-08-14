import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";


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


    constructor(
        private readonly _usuarioService: UsuarioService
    ) {
    }


    @Get()
    async mostrarTodos(){
        try{
            const respuesta = await this._usuarioService.buscarTodos()
            return respuesta
        }catch (e){
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servicio',
            })
        }
    }

    @Post()
    async crearUno(
        @Body() paramBody
    ){
        try{
            const usuarioValidado = new UsuarioCreateDto()
            //usuarioValidado.id = paramBody.id
            usuarioValidado.nombre = paramBody.nombre
            usuarioValidado.apellido = paramBody.apellido
            usuarioValidado.cedula = paramBody.cedula
            usuarioValidado.sueldo = paramBody.sueldo
            usuarioValidado.fechaNacimiento = paramBody.fechaNacimiento
            usuarioValidado.fechaHoraNacimiento = paramBody.fechaHoraNacimiento

            const errores: ValidationError[] = await validate(usuarioValidado)

            if(errores.length > 0 ){
                console.error('Errores: ', errores);
                throw new BadRequestException({
                    mensaje: 'Error en el formato de los datos'
                });
            }else {
                try {
                    const respuesta = await this._usuarioService.crearUno(paramBody);
                    return respuesta;
                } catch (e) {
                    throw new BadRequestException({
                        mensaje: 'Error al Crear Uno'
                    })
                }
            }
        }catch (e){
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error al validar datos'
            })
        }
    }

    @Get(':id')
    async verUno(
        @Param() paramRuta
    ){
        let respuesta
        try{
            respuesta = await this._usuarioService.buscarUno(Number(paramRuta.id))
        } catch(e){
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }

        if(respuesta){
            return respuesta
        } else {
            throw  new NotFoundException({
                mensaje: 'No existen registros'
            })
        }
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


