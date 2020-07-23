import {Module} from '@nestjs/common';
import {CalcCookiesController} from "./calc-cookies.controller";

@Module({
    imports: [],
    controllers: [
        CalcCookiesController
    ],
    providers: [],
})

// @ts-ignore
export class CalcCookiesModule {

}