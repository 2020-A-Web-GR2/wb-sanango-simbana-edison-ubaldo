import {
    IsDate,
    IsDateString,
    IsDecimal,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength
} from "class-validator";


export class usuarioUpdateDto{


    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    id:number

    @MaxLength(10)
    @IsOptional()
    nombre?:string

    @MaxLength(10)
    @IsOptional()
    apellido?:string

    @IsNotEmpty()
    @MaxLength(18)
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