import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";

// Definido hasta ahora ----> http://localhost:3001/juegos-http

@Controller('juegos-http')

export class HttpJuegoController {

    //http://localhost:3001/juegos-http/hola

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

}

