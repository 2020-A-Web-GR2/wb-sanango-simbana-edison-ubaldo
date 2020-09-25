import {Body, Controller, Get, Post, Req, Res, Session} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('login')
    login(
        @Res() res,
    ) {
        return res.render('login/login')
    }


    @Post('login')
    loginPost(
        @Body() parametrosBody,
        @Res() res,
        @Session() session,
    ) {
        // CONSULTA VALIDACION A LA BD
        const usuario = parametrosBody.usuario
        const pswd = parametrosBody.password

        if (usuario == 'Edison' && pswd == '12345') {
            session.usuario = usuario
            session.roles = ['Administrador']
            return res.redirect('protegido');

        } else {
            if (usuario == 'Ubaldo' && pswd == '09876') {
                session.usuario = usuario
                session.roles = ['Supervisor']
                return res.redirect('protegido')
            } else {
                return res.redirect('/login')
            }
        }
    }


    @Get('protegido')
    protegido(
        @Res() res,
        @Session() session,
    ){

        const estaLogeado = session.usuario;
        if(estaLogeado){
            return res.render(
                'login/protegido',
                {
                    usuario:session.usuario,
                    roles: session.roles,
                }
            )
        } else {
            return res.redirect('/login')
        }
    }


    @Get('logout')
    logout(
        @Session() session,
        @Res() res,
        @Req() req,
    ){

        session.usuario = undefined
        session.roles = undefined

        req.session.destroy()
        return res.redirect('login')

    }


}
