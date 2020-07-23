import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Post,
    Put,
    Query,
    Headers, BadRequestException, Res, Body, Param
} from "@nestjs/common";
import {ValidationError,validate} from "class-validator";
import {CalcCookiesCreateDto} from "./dto/calc-cookies.create.dto";
import {Observable} from "rxjs";

@Controller('calc-cookies')

export class CalcCookiesController {

    nombre = ''
    //QUERY (n1)
    //HEADERS (n2)
    @Get('sumar')
    @HttpCode(200)
    async sumar(
        @Headers() paramHeaders,
        @Query() paramQuery,
        @Res() res,
    ){
        console.log('estos son los headers:',paramHeaders.cookie)
        const operacion = new CalcCookiesCreateDto()
        operacion.n1 = paramQuery.n1
        operacion.n2 = paramHeaders.n2

        const errores: ValidationError[] = await validate(operacion)


        if (paramHeaders.cookie === undefined){
            throw new BadRequestException('Debe ingresar un nombre de usuario en la cookie insegura y no firmada')
        } else {
            if(errores.length > 0){
                throw new BadRequestException('Debe ingresar números');
            } else {
                console.log('headers', paramHeaders)
                const resultado = Number(paramQuery.n1) + Number(paramHeaders.n2)
                res.send({
                    resultado
                });
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
    ){
        const operacion = new CalcCookiesCreateDto()
        operacion.n1 = paramBody.n1
        operacion.n2 = paramRuta.n2

        const errores: ValidationError[] = await validate(operacion)
        if (paramHeaders.cookie === undefined){
            throw new BadRequestException('Debe ingresar un nombre de usuario en la cookie insegura y no firmada');
        } else {
            if(errores.length > 0 ){
                throw new BadRequestException('Debe ingresar números');
            } else {
                const resultado = Number(paramBody.n1) - Number(paramRuta.n2)
                res.send({
                    resultado
                });
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
    ){
        const operacion = new CalcCookiesCreateDto()
        operacion.n1 = paramHeaders.n1
        operacion.n2 = paramBody.n2

        const errores: ValidationError[] = await validate(operacion)

        if (paramHeaders.cookie === undefined){
            throw new BadRequestException('Debe ingresar un nombre de usuario en la cookie insegura y no firmada');
        } else {
            if(errores.length > 0 && this.nombre){
                throw new BadRequestException('Debe ingresar números');
            } else {
                const resultado = Number(paramHeaders.n1) * Number(paramBody.n2)
                res.send({
                    resultado
                });
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
    ){
        const operacion = new CalcCookiesCreateDto()
        operacion.n1 = paramRuta.n1
        operacion.divisor = paramQuery.n2

        const errores: ValidationError[] = await validate(operacion)

        if (paramHeaders.cookie === undefined){
            throw new BadRequestException('Debe ingresar un nombre de usuario en la cookie insegura y no firmada');
        } else {
            if(errores.length > 0 ){
                if(errores[0].value == '0'){
                    throw new BadRequestException('El divisor no puede ser 0');
                }
                console.error('e',errores)
                throw new BadRequestException('Debe ingresar números');
            } else {
                const resultado = Number(paramRuta.n1) / Number(paramQuery.n2)
                res.send({
                    resultado
                });
            }
        }
    }


    @Get('nombre')
    @HttpCode(201)
    guardar(
        @Headers() headers,
        @Query() paramQuery,
        @Res() res
    ){
        //console.log(headers)
        res.header('Headers', headers)
        res.cookie(
            'nombre',
            paramQuery.nombre,
        );

        const mensaje = 'Cookie insegura y no firmada "'+ paramQuery.nombre + '" guardada.'
        res.send({
            mensaje
        });
    }

}