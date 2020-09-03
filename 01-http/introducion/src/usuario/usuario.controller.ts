import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {assignCustomParameterMetadata} from "@nestjs/common/utils/assign-custom-metadata.util";
import {UsuarioUpdateDto} from "./dto/usuario.update-dto";
import {UsuarioEntity} from "./usuario.entity";
import {MascotaService} from "../mascota/mascota.service";


@Controller('usuario')
export class UsuarioController {

    arregloUsuarios = [
        {
            id: 1,
            nombre: "Edison",
        },
        {
            id: 2,
            nombre: "Sancho"
        },
        {
            id: 3,
            nombre: "Manolo"
        }
    ]
    idActual = 3


    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService
    ) {
    }


    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._usuarioService.buscarTodos()
            return respuesta
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servicio',
            })
        }
    }


    @Post()
    async crearUno(
        @Body() paramBody
    ) {
        try {
            const limite = 9999999999.9999 // 10.245234524
            if (Number(paramBody.sueldo) > limite) {
                throw new BadRequestException({
                    mensaje: 'El sueldo es más grande de lo permitido'
                });
            } else {
                const usuarioValidado = new UsuarioCreateDto()
                usuarioValidado.nombre = paramBody.nombre
                usuarioValidado.apellido = paramBody.apellido
                usuarioValidado.cedula = paramBody.cedula
                usuarioValidado.sueldo = paramBody.sueldo
                usuarioValidado.fechaNacimiento = paramBody.fechaNacimiento
                usuarioValidado.fechaHoraNacimiento = paramBody.fechaHoraNacimiento

                const errores: ValidationError[] = await validate(usuarioValidado)

                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    throw new BadRequestException({
                        mensaje: 'Error en el formato de los datos'
                    });
                } else {
                    try {
                        const respuesta = await this._usuarioService.crearUno(paramBody);
                        return respuesta;
                    } catch (e) {
                        throw new InternalServerErrorException({
                            mensaje: 'Error del servicio',
                        })
                    }
                }
            }

        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error al validar datos'
            })
        }
    }

    @Get(':id')
    async verUno(
        @Param() paramRuta
    ) {
        let respuesta
        try {
            respuesta = await this._usuarioService.buscarUno(Number(paramRuta.id))
        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }

        if (respuesta) {
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
    ) {

        try {
            const limiteEditar = 9999999999.9999 //10.3141341324
            if (Number(paramBody.sueldo) > limiteEditar) {
                throw new BadRequestException({
                    mensaje: 'El sueldo es más grande de lo permitido'
                });
            } else {

                const id = Number(paramRuta.id)
                const usuarioValidado = new UsuarioUpdateDto()

                usuarioValidado.id = id
                usuarioValidado.nombre = paramBody.nombre
                usuarioValidado.apellido = paramBody.apellido
                usuarioValidado.cedula = paramBody.cedula
                usuarioValidado.sueldo = paramBody.sueldo
                usuarioValidado.fechaNacimiento = paramBody.fechaNacimiento
                usuarioValidado.fechaHoraNacimiento = paramBody.fechaHoraNacimiento

                // crear la instancia del dto
                const errores: ValidationError[] = await validate(usuarioValidado)

                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    throw new BadRequestException({
                        mensaje: 'Error en el formato de los datos'
                    });
                } else {
                    try {
                        const usuarioEditado = paramBody
                        usuarioEditado.id = id
                        //console.log(usuarioEditado)
                        const respuesta = await this._usuarioService.editarUno(usuarioEditado);
                        return respuesta;
                    } catch (e) {
                        throw new InternalServerErrorException({
                            mensaje: 'Error del servicio',
                        })
                    }
                }
            }

        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error al validar datos'
            })
        }
    }


    @Delete(':id')
    async eliminarUno(
        @Param()
            paramRuta
    ) {

        const id = Number(paramRuta.id)

        try {
            const respuesta = await this._usuarioService.eliminarUno(id)
            return {
                mensaje: 'Registro con id ' + id + ' eliminado.'
            }

        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error del servidor'
            })
        }
    }


    @Post('crearUsuarioYmascota')
    async crearUsuarioMascota(
        @Body() paramBody,
    ) {
        const usuario = paramBody.usuario
        // validar usuario dto
        const mascota = paramBody.mascota
        // validar mascota dto
        let usuarioCreado
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario)
            let mascotaCreada
            try {
                mascota.usuario = usuarioCreado.id
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota)
                if (mascotaCreada) {
                    return {
                        mascota: mascotaCreada,
                        usuario: usuarioCreado
                    }
                } else {
                    throw new InternalServerErrorException({
                        mensaje: 'Error en el servidor'
                    })
                }
            } catch (e) {
                console.error(e)
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota'
                })
            }
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error creando usuario'
            })
        }
    }


    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ) {
        const nombreControlador = 'Edison'
        res.render(
            'usuario/ejemplo', // nombre de la vista - sin el .ejs
            {  // parametros de la vista
                nombre: nombreControlador
            })
    }

    @Get('vista/faq')
    vistaFaq(
        @Res() res
    ) {
        res.render('usuario/faq') // nombre de la vista - sin el .ejs
    }

    @Get('vista/login')
    vistaLogin(
        @Res() res
    ) {
        res.render('usuario/login') // nombre de la vista - sin el .ejs
    }

    @Get('vista/inicio')
    async vistaInicio(
        @Res() res
    ) {
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos()
        } catch(error){
            throw new InternalServerErrorException('Error encontrando usuarios')
        }

        if(resultadoEncontrado){
            res.render('usuario/inicio', {arregloUsuarios: resultadoEncontrado}) // con esto mando resultadoEcontrado hasta usuario/inicio
        } else {
            throw new NotFoundException('NO se encontraron usuarios')
        }

    }


    @Get('vista/crear')
    vistaCrearUsuario(
        @Res() res
    ) {
        res.render('usuario/crear')
    }


}


