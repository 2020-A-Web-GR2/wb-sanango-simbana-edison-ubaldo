import {
    IsNotEmpty, IsNumberString, IsOptional, MaxLength,
} from "class-validator";

export class AulaUpdateDto {

    @IsNotEmpty()
    @IsNumberString()
    numero: string

    @IsNotEmpty()
    @IsNumberString()
    piso: string

    @IsNotEmpty()
    @MaxLength(100)
    conserje: string

    @IsNotEmpty()
    @MaxLength(500)
    recursos: string

    @IsOptional()
    @MaxLength(500)
    novedades?: string


}