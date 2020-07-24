import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Post,
    Put,
    Query,
    Headers, BadRequestException, Res, Body, Param, Req, Head
} from "@nestjs/common";
import {ValidationError, validate} from "class-validator";
import {CalcCookiesCreateDto} from "./dto/calc-cookies.create.dto";
import {decode} from "querystring";

const cookieParser = require('cookie-parser')
const cookie = require('cookie');

@Controller('calc-cookies')

export class CalcCookiesController {

    //QUERY (n1)
    //HEADERS (n2)
    @Get('sumar')
    @HttpCode(200)
    async sumar(
        @Headers() paramHeaders,
        @Query() paramQuery,
        @Res() res,
    ) {
        const datos = new CalcCookiesCreateDto()
        datos.n1 = paramQuery.n1
        datos.n2 = paramHeaders.n2

        const errores: ValidationError[] = await validate(datos)

        if (paramHeaders.cookie === undefined) {
            throw new BadRequestException('Debe ingresar un nombre de usuario en la cookie insegura y no firmada')
        } else {
            if (errores.length > 0) {
                throw new BadRequestException('Debe ingresar números');
            } else {
                const operacion = Number(paramQuery.n1) + Number(paramHeaders.n2)
                this.validacionCookie(paramHeaders, res, operacion)
            }
        }
    }


    //BODY (n1)
    //RUTA (n2)
    @Put('restar/:n2')
    @HttpCode(201)
    async restar(
        @Headers() paramHeaders,
        @Body() paramBody,
        @Param()  paramRuta,
        @Res() res,
    ) {
        const datos = new CalcCookiesCreateDto()
        datos.n1 = paramBody.n1
        datos.n2 = paramRuta.n2

        const errores: ValidationError[] = await validate(datos)
        if (paramHeaders.cookie === undefined) {
            throw new BadRequestException('Debe ingresar un nombre de usuario en la cookie insegura y no firmada');
        } else {
            if (errores.length > 0) {
                throw new BadRequestException('Debe ingresar números');
            } else {
                const operacion = Number(paramBody.n1) - Number(paramRuta.n2)
                this.validacionCookie(paramHeaders, res, operacion)

            }
        }
    }


    //HEADERS (n1)
    // BODY (n2)
    @Delete('multiplicacion')
    @HttpCode(200)
    async multiplicacion(
        @Headers() paramHeaders,
        @Body() paramBody,
        @Res() res
    ) {
        const datos = new CalcCookiesCreateDto()
        datos.n1 = paramHeaders.n1
        datos.n2 = paramBody.n2

        const errores: ValidationError[] = await validate(datos)

        if (paramHeaders.cookie === undefined) {
            throw new BadRequestException('Debe ingresar un nombre de usuario en la cookie insegura y no firmada');
        } else {
            if (errores.length > 0) {
                throw new BadRequestException('Debe ingresar números');
            } else {
                const operacion = Number(paramHeaders.n1) * Number(paramBody.n2)
                this.validacionCookie(paramHeaders, res, operacion)
            }
        }
    }


    //RUTA (n1)
    //QUERY(N2)
    @Post('division/:n1')
    @HttpCode(201 && this.nombre)
    async division(
        @Headers() paramHeaders,
        @Param() paramRuta,
        @Query() paramQuery,
        @Res() res
    ) {
        const datos = new CalcCookiesCreateDto()
        datos.n1 = paramRuta.n1
        datos.divisor = paramQuery.n2

        const errores: ValidationError[] = await validate(datos)

        if (paramHeaders.cookie === undefined) {
            throw new BadRequestException('Debe ingresar un nombre de usuario en la cookie insegura y no firmada');
        } else {
            if (errores.length > 0) {
                if (errores[0].value == '0') {
                    throw new BadRequestException('El divisor no puede ser 0');
                }
                console.error('e', errores)
                throw new BadRequestException('Debe ingresar números');
            } else {
                const operacion = Number(paramRuta.n1) / Number(paramQuery.n2)
                this.validacionCookie(paramHeaders, res, operacion)
            }
        }
    }


    validacionCookie(@Headers() paramHeaders, @Res() res, operacion) {
        const mensajeOperacion = 'El resultado de la operacion es: ' + operacion

        var desencriptado = cookie.parse(paramHeaders.cookie)
        desencriptado = desencriptado.valor.split(':')[1].split('.')
        const resultado = Number(desencriptado[0]) - Math.abs(operacion)
        var mensajeValorCookie = ''
        if (resultado <= 0) {
            this.puntaje(res, 100)
            mensajeValorCookie = 'Se acabaron sus puntos. Se le han reasignado 100 puntos.'
        } else {
            this.puntaje(res, resultado)
            mensajeValorCookie = 'Le quedan ' + resultado + ' puntos.'
        }

        res.send({mensajeOperacion, mensajeValorCookie});
    }


    @Get('nombre')
    @HttpCode(201)
    guardar(
        @Headers() headers,
        @Query() paramQuery,
        @Res() res
    ) {
        console.log(headers)
        res.header('Headers', headers)
        res.cookie(
            'nombre',
            paramQuery.nombre,
        );
        try {
            const puntaje = 100
            this.puntaje(res, puntaje)
            const mensaje = 'Cookie insegura no firmada -> ' + paramQuery.nombre
            const valor = 'Cookie insegura firmada -> ' + puntaje
            res.send({
                mensaje,
                valor
            })
        } catch (e) {
            console.error('Error al guardar las cookies.')
        }


    }

    puntaje(
        @Res() res,
        valor
    ) {
        res.cookie('valor', valor, {signed: true})
    }

    @Get('mostrarcookies')
    mostrarcookies(
        @Req() req,
    ) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        }

        return mensaje;
    }


}