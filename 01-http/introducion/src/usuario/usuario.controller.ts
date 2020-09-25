import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
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
        return res.render(
            'usuario/ejemplo', // nombre de la vista - sin el .ejs
            {  // parametros de la vista
                nombre: nombreControlador
            })
    }

    @Get('vista/faq')
    vistaFaq(
        @Res() res
    ) {
        return res.render('usuario/faq') // nombre de la vista - sin el .ejs
    }

    @Get('vista/login')
    vistaLogin(
        @Res() res
    ) {
        return res.render('usuario/login') // nombre de la vista - sin el .ejs
    }

    @Get('vista/inicio')
    async vistaInicio(
        @Res() res,
        @Query() parametrosConsulta
    ) {
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosConsulta.busqueda)
            console.log(resultadoEncontrado)
        } catch(error){
            throw new InternalServerErrorException('Error encontrando usuarios')
        }

        if(resultadoEncontrado){
            return res.render('usuario/inicio', {
                arregloUsuarios: resultadoEncontrado,
                parametrosConsulta: parametrosConsulta}) // con esto mando resultadoEcontrado hasta usuario/inicio
        } else {
            throw new NotFoundException('NO se encontraron usuarios')
        }

    }


    @Get('vista/crear') // Controlador
    crearUsuarioVista(
        @Query() parametrosConsulta,
        @Res() res,
    ) {

        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
            }
        )
    }

    @Get('vista/editar/:id') // Controlador
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Res() res,
        @Param() parametrosRuta
    ) {
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado

        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id)
        } catch (error) {
            console.error('Error del servidor')
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario')
        }

        if (usuarioEncontrado){
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado
                }
            )
        } else {
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado')
        }

    }



    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() paramBody,
        @Res() res,
    ){
        // validar con DTO
        let respuestaCreacionUsuario
        let nombreApellidoConsulta
        let cedulaConsulta
        if(paramBody.cedula && paramBody.nombre && paramBody.apellido){
            nombreApellidoConsulta = `&nombre=${paramBody.nombre}&apellido=${paramBody.apellido}`
            if(paramBody.cedula.length === 10){
                cedulaConsulta = `&cedula=${paramBody.cedula}`
            }else{
                const mensajeError = 'Cedula incorrecta'
                return res.redirect('/usuario/vista/crear?error='+mensajeError+ nombreApellidoConsulta)
            }
        }else{
            const mensajeError = 'Enviar cedula(10), nombre y apellido.'
            return res.redirect('/usuario/vista/crear?error='+mensajeError)
        }

        try {
            respuestaCreacionUsuario = await this._usuarioService.crearUno(paramBody) // se debe validar ese paramBody
        }  catch (error){
            console.error(error)
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error='+mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }

        if (respuestaCreacionUsuario){
            return res.redirect('/usuario/vista/inicio') // esto redirige
        } else {
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error='+mensajeError+ nombreApellidoConsulta + cedulaConsulta)
        }
    }


    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            //cedula: parametrosCuerpo.cedula
        } as UsuarioEntity

        try {
            await this._usuarioService.editarUno(usuarioEditado)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado')
        } catch (error){
            console.error(error)
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando Usuario')
        }

    }


    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() paramRuta,
        @Res() res,
    ){
        try{
            await this._usuarioService.eliminarUno(Number(paramRuta.id))
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario Eliminado')
        } catch(error){
            console.error(error)
            return res.redirect('/usuario/vista/inicio?error=Error eliminando Usuario')
        }
    }
}


