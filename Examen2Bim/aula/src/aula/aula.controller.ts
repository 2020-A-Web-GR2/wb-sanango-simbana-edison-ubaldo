import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {AulaService} from "./aula.service";
import {AulaCreateDto} from "./dto/aula.create-dto";
import {validate, ValidationError} from "class-validator";
import {AulaUpdateDto} from "./dto/aula.update-dto";


@Controller('aula')
export class AulaController {

    constructor(
        private readonly _aulaService: AulaService
    ) {
    }

    @Get('vista/inicio')
    async obtenerAulas(
        @Session() session,
        @Query() parametrosConsulta,
        @Res() res,
    ) {

        if (session.usuarioId) {
            try {
                let resultadoEncontrado
                if (parametrosConsulta.busqueda == undefined) {
                    parametrosConsulta.busqueda = ''
                }
                resultadoEncontrado = await this._aulaService.buscarTodos(parametrosConsulta.busqueda)
                return res.render('aula/inicio',
                    {
                        arregloAulas: resultadoEncontrado,
                    })

            } catch (error) {
                error = 'Error encontrando datos.'
                return res.redirect('/principal?error=' + error)
            }
        } else {
            return res.redirect('/login')
        }
    }

    @Get('vista/crear')
    crearAula(
        @Query() parametrosConsulta,
        @Session() session,
        @Res() res,
    ) {
        if (session.usuarioId) {
            return res.render('aula/crear',
                {
                    error: parametrosConsulta.error,
                    numero: parametrosConsulta.numero,
                    piso: parametrosConsulta.piso,
                    conserje: parametrosConsulta.conserje,
                    recursos: parametrosConsulta.recursos,
                    novedades: parametrosConsulta.novedades,
                })
        } else {
            return res.redirect('/login')
        }
    }


    @Post('crear')
    async crearAulaDesdeVista(
        @Body() parametrosBody,
        @Session() session,
        @Res() res,
    ) {
        if (session.usuarioId) {

            const aulaValidada = new AulaCreateDto()
            aulaValidada.numero = parametrosBody.numero
            aulaValidada.piso = parametrosBody.piso
            aulaValidada.conserje = parametrosBody.conserje
            aulaValidada.novedades = parametrosBody.novedades
            aulaValidada.recursos = parametrosBody.recursos

            const errores: ValidationError[] = await validate(aulaValidada)
            const texto = `&numero=${parametrosBody.numero}&piso=${parametrosBody.piso}&conserje=${parametrosBody.conserje}&novedades=${parametrosBody.novedades}&recursos=${parametrosBody.recursos}`
            if (errores.length > 0) {
                const error = 'Error en el formato de los datos. Asegúrese de llenar los campos correctamente.'
                return res.redirect('/aula/vista/crear?error=' + error + texto)
            } else {

                const re = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u;
                if (re.test(parametrosBody.conserje)) {
                    try {
                        const respuestaCreacionAula = await this._aulaService.crearUno(parametrosBody)

                        if (respuestaCreacionAula) {
                            const exito = 'Aula creada correctamente'
                            return res.redirect('/principal?exito=' + exito)
                        } else {
                            const errorCreacion = 'Error al crear el Aula.'
                            return res.redirect('/principal?error=' + errorCreacion)
                        }

                    } catch (e) {
                        console.error(e)
                        const errorCreacion = 'Error al crear el aula. Inténtelo más tarde.'
                        return res.redirect('/principal?error=' + errorCreacion)
                    }

                } else {
                    const error = 'Caracteres no permitidos.'
                    return res.redirect('/aula/vista/crear?error=' + error + texto)
                }
            }

        } else {
            return res.redirect('/login')
        }

    }


    @Get('vista/editar/:idAula')
    async editarAula(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session,
        @Param() parametrosRuta,
    ) {
        if (session.usuarioId) {

            try {
                const idAula = Number(parametrosRuta.idAula)
                const aula = await this._aulaService.buscarUno(idAula)

                if (aula) {
                    return res.render('aula/crear',
                        {
                            error: parametrosConsulta.error,
                            aula: aula,
                        }
                    )
                } else {
                    const error = 'Error encontrando datos.'
                    return res.redirect('/principal?error=' + error)
                }

            } catch (e) {
                const error = 'Error encontrando datos.'
                return res.redirect('/principal?error=' + error)
            }

        } else {
            return res.redirect('/login')
        }

    }

    @Post('editar/:id')
    async editarAulaDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosBody,
        @Res() res,
        @Session() session,
    ) {
        if (session.usuarioId) {
            const aulaValidada = new AulaUpdateDto()
            aulaValidada.numero = parametrosBody.numero
            aulaValidada.piso = parametrosBody.piso
            aulaValidada.conserje = parametrosBody.conserje
            aulaValidada.novedades = parametrosBody.novedades
            aulaValidada.recursos = parametrosBody.recursos

            const errores: ValidationError[] = await validate(aulaValidada)
            const texto = `&numero=${parametrosBody.numero}&piso=${parametrosBody.piso}&conserje=${parametrosBody.conserje}&novedades=${parametrosBody.novedades}&recursos=${parametrosBody.recursos}`
            if (errores.length > 0) {
                return res.redirect('/aula/vista/editar/' + parametrosRuta.id + '?error=Error en el formato de los datos')
            } else {
                const re = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u;
                if (re.test(parametrosBody.conserje)) {
                    parametrosBody.aulaId = Number(parametrosRuta.id)

                    const aulaEditada = await this._aulaService.editarUno(parametrosBody)

                    if (aulaEditada) {
                        const exito = 'Aula editada correctamente'
                        return res.redirect('/principal?exito=' + exito)
                    } else {
                        const errorCreacion = 'Error editando Aula.'
                        return res.redirect('/principal?error=' + errorCreacion)
                    }
                } else {
                    const error = 'Caracteres no permitidos.'
                    return res.redirect('/aula/vista/crear?error=' + error + texto)
                }
            }
        } else {
            return res.redirect('/login')
        }
    }


    @Get('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() paramRuta,
        @Res() res,
        @Session() session,
    ) {
        if (session.usuarioId) {
            try {
                await this._aulaService.eliminarUno(Number(paramRuta.id))
                return res.redirect('/principal?exito=Aula eliminada exitosamente.')
            } catch (error) {
                console.error(error)
                return res.redirect('/principal?error=Error eliminando el aula.')
            }
        } else {
            return res.redirect('/login')
        }
    }


}