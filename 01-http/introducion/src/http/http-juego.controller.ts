import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Headers,
    HttpCode,
    Param,
    Post,
    Query, Req,
    Res
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator"
// Definido hasta ahora ----> http://localhost:3001/juegos-http

@Controller('juegos-http') // esto define que después de :3001/ vaya 'juegos-http'

export class HttpJuegoController {

    //http://localhost:3000/juegos-http/hola

    @Get('hola')
    @HttpCode(201)
    holaGet() {
        throw new BadRequestException('No envia nada')
//        return 'Hola GET.'
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'Hola POST.'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    holaDelete(){
        return 'hola DELETE.'
    }



    @Get('/parametros-ruta/:id/nombre/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta)
        if(!isNaN(parametrosRuta.altura) && !isNaN(parametrosRuta.id)){
            return Number(parametrosRuta.id) + Number(parametrosRuta.altura)
        } else {
            throw new BadRequestException('No son números')
        }

    }


    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
      console.log('Parametros de consulta: ', parametrosDeConsulta);
      if (parametrosDeConsulta.nombre && parametrosDeConsulta.apellido ){
          return parametrosDeConsulta.nombre + " " + parametrosDeConsulta.apellido
      } else {
          return '= ('
      }
    }


    @Post('parametros-cuerpo')
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        const mascotaValida = new MascotaCreateDto();

        mascotaValida.castrada = parametrosDeCuerpo.castrada;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.hijos = parametrosDeCuerpo.hijos;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;

        try  {
            const errores: ValidationError[] = await validate(mascotaValida)
            if(errores.length > 0 ){
                console.error('Errores: ', errores);
                throw new BadRequestException('Error validando');
            }else {
                return {
                    mensaje: 'Se creo correctamente'
                };
            }
        } catch (e) {
            console.error('Error: ', e);
            throw new BadRequestException('Error al validar');
        }

        //console.log('Parametros de cuerpo ', parametrosDeCuerpo)
        //return parametrosDeCuerpo
    }


    //                              COOKIES


    // INSEGURA
    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res
    ){
        //res.cookie('nombre','valor',
        res.cookie(
            'cookieInsegura', // nombre
            'insegura', // valor
        );

        const mensaje = 'OK';
        res.send({
            mensaje
        });

    }


    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res
    ){
        //res.cookie('nombre','valor',
        res.cookie(
            'cookieSegura', // nombre
            'segura', // valor
            {
                secure: true
            }
        );

        const mensaje = 'OK Seguro';
        res.send({
            mensaje
        });
    }


    @Get('mostrarcookies')
    mostrarcookies(
        @Req() req,
    ){
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        }

        return mensaje;
        //res.send(mensaje)
    }


    @Get('guardarcookiefirmada')
    guardarcookiefirmada(
        @Res() res,

        //COMO ACCEDER A LAS CABECERAS
        @Headers() headers, //cabecera de peticion
    ){
        console.log(headers) //se imprimen las cookies
        res.header('Headers', headers)  //cabecera respuestas
        res.cookie('cookiefirmada','firmadooooo', {signed:true})
        const mensaje = {
            mensaje: 'Cookie firmada y segura OK.'
        }
        res.send(mensaje)
    }
}















