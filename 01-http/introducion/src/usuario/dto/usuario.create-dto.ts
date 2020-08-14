import {
    IsDate,
    IsDateString,
    IsDecimal,
    IsNotEmpty,
    IsNumber, IsNumberString,
    IsOptional,
    IsPositive,
    MaxLength
} from "class-validator";


export class UsuarioCreateDto{


    /* @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    id:number */

    @MaxLength(60)
    @IsOptional()
    nombre?:string

    @MaxLength(60)
    @IsOptional()
    apellido?:string

    @IsNotEmpty()
    @MaxLength(18)
    @IsNumberString()
    cedula:string     //revisar la validacion del unique

    @IsOptional()
    @IsDecimal()  // como validar la precision y escala
    sueldo?:number


    @IsOptional()
    @IsDate() // diferenciar entre date y datetime
    fechaNacimiento?:string

    @IsOptional()
    @IsDateString()  // diferenciar entre date y datetime
    fechaHoraNacimiento?:string
}