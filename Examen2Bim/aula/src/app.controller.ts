import {Body, Controller, Get, Post, Query, Req, Res, Session} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }


    @Get('login')
    login(
        @Session() session,
        @Res() res,
        @Query() paramConsulta,
    ) {
        return res.render('login',
            {
                error: paramConsulta.error,
            })
    }


    @Post('loginDesdeVista')
    async loginDesdeVista(
        @Body() paramBody,
        @Session() session,
        @Res() res,
    ) {

        try {
            const user = paramBody.user
            const password = paramBody.password

            if (user === 'Edison' && password === '12345') {
                session.usuarioId = 1
                return res.redirect('principal')
            } else {
                return res.redirect('login?error=Usuario no encontrado. Revise sus credenciales.')
            }

        } catch (e) {
            return res.redirect('login?error=Error en el servidor.')
        }
    }


    @Get('cerrarSesion')
    cerrarSesion(
        @Session() session,
        @Res() res,
        @Req() req,
    ) {
        if (session.usuarioId) {
            session.usuarioId = undefined
            req.session.destroy()
        }
        return res.redirect('login')
    }


    @Get('principal')
    principal(
        @Query() paramConsulta,
        @Res() res,
        @Session() session,
    ) {
        if (session.usuarioId) {
            return res.render('principal',
                {
                    exito: paramConsulta.exito,
                    error: paramConsulta.error,
                })
        } else {
            return res.redirect('login')
        }
    }

}
