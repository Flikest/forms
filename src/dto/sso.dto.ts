import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty, IsNotEmpty } from "class-validator";

export class UserDto{
    @ApiProperty()
    @IsNotEmpty()
    login: string

    @ApiProperty()
    @IsNotEmpty()
    password: string
}