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

export class UsuarioUpdateDto {

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    id:number

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
    @IsNumberString()
    @IsDecimal({'decimal_digits': '0,4'} ) // como validar la precision y escala
    sueldo?:string

    @IsOptional()
    @IsDateString() // diferenciar entre date y datetime
    fechaNacimiento?:string

    @IsOptional()
    @IsDateString()  // diferenciar entre date y datetime
    fechaHoraNacimiento?:string
}