import { IsString,IsPositive,MinLength,Min,IsInt } from "class-validator"

export class CreatePokemonDto {

    @IsPositive()
    @IsInt()
    @Min(1)
    no:number;

    @IsString()
    @MinLength(1)
    name:string;

}
