// @IsAlpha() // @IsNotEmpty() // @MinLength() // @MaxLength() // @IsBoolean() // @IsEmpty() // @IsInt() // @IsPositive() // @IsOptional() // @IsNumber()

import {
    IsAlpha,
    IsBoolean,
    IsEmpty,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength,
} from "class-validator";

export class MascotaCreateDto {

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(10)
    nombre: string;

    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    edad: number;

    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    hijos: number;

    @IsBoolean()
    @IsOptional()
    castrada?: boolean; //variable opcional dentro de la clase


    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    peso: number;
}

