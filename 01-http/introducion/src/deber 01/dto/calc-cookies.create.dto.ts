import {
    Equals,
    IsNumber, IsNumberString,
    IsOptional,
    NotEquals
} from "class-validator";

export class CalcCookiesCreateDto {

    @NotEquals("0")
    @IsOptional()
    @IsNumberString()
    divisor?: number;

    @IsNumberString()
    n1: number;

    @IsOptional()
    @IsNumberString()
    n2?: number;

}