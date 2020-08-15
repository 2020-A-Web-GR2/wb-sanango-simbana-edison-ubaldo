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
import {assignCustomParameterMetadata} from "@nestjs/common/utils/assign-custom-metadata.util";


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
                    throw new InternalServerErrorException({
                        mensaje: 'Error del servicio',
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
    async editarUno(
        @Param() paramRuta,
        @Body() paramBody,
    ){
        const id = Number(paramRuta.id)
        const usuarioEditado = paramBody

        usuarioEditado.id = id

        try{
            const respuesta = await this._usuarioService.editarUno(usuarioEditado)
            return respuesta
        } catch(e){
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error del servidor'
            })
        }

    }


    @Delete(':id')
    async eliminarUno(
        @Param() paramRuta
    ){

        const id = Number(paramRuta.id)

        try{
            const respuesta = await this._usuarioService.eliminarUno(id)
            return {
                mensaje: 'Registro con id ' + id + ' eliminado.'
            }

        } catch (e){
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error del servidor'
            })
        }
    }

}


